/**
 * Central API service — all backend calls and external API calls go through here.
 * Base URL: http://localhost:8080/api (Spring Boot)
 * External: Open-Meteo (no API key needed)
 */

const API_BASE_URL = "http://localhost:8080/api";

// ─── Auth ────────────────────────────────────────────────────────────────────

export const apiService = {
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Login failed" }));
      throw new Error(err.message || "Invalid credentials");
    }
    return res.json();
  },

  async register(fullName, email, password, role = "farmer") {
    // Split fullName → firstName + lastName for the User model
    const parts = fullName.trim().split(" ");
    const firstName = parts[0] || fullName;
    const lastName = parts.slice(1).join(" ") || "";

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName, role }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Registration failed" }));
      throw new Error(err.message || "Failed to register");
    }
    return res.json();
  },

  async getCurrentUser(email) {
    const res = await fetch(`${API_BASE_URL}/auth/me?email=${encodeURIComponent(email || "")}`);
    if (!res.ok) throw new Error("Failed to get current user");
    return res.json();
  },

  // ─── Dashboard ─────────────────────────────────────────────────────────────

  async getDashboardSummary(lat, lon) {
    let url = `${API_BASE_URL}/dashboard/summary`;
    if (lat != null && lon != null) {
      url += `?lat=${lat}&lon=${lon}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to get dashboard summary");
    return res.json();
  },

  // ─── Scanner ───────────────────────────────────────────────────────────────

  async getScanHistory() {
    const res = await fetch(`${API_BASE_URL}/scanner/history`);
    if (!res.ok) throw new Error("Failed to get scan history");
    return res.json();
  },

  async scanCrop(file, cropName = "Maize") {
    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("cropName", cropName);
    const res = await fetch(`${API_BASE_URL}/scanner/scan`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Crop scan request failed");
    return res.json();
  },

  // ─── Market ────────────────────────────────────────────────────────────────

  async getMarketTrends() {
    const res = await fetch(`${API_BASE_URL}/market/trends`);
    if (!res.ok) throw new Error("Failed to get market trends");
    return res.json();
  },
};

// ─── Weather (Open-Meteo — no key needed) ────────────────────────────────────

export const weatherService = {
  /**
   * Fetch 5-day agricultural weather for the given coordinates.
   * Uses Open-Meteo free tier. Returns structured data for the Weather page.
   */
  async getWeather(lat = -27.6567, lon = 27.2316) {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,windspeed_10m,precipitation_probability,weathercode` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max` +
      `&hourly=soil_moisture_0_to_1cm` +
      `&forecast_days=5&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather fetch failed");
    const data = await res.json();

    const cur = data.current;
    const daily = data.daily;
    const hourly = data.hourly;

    // Soil moisture: average of the first 24 hours
    const soilMoistureRaw = hourly?.soil_moisture_0_to_1cm?.slice(0, 24) || [];
    const soilMoisturePct = soilMoistureRaw.length
      ? Math.round((soilMoistureRaw.reduce((a, b) => a + (b || 0), 0) / soilMoistureRaw.length) * 100)
      : 65;

    // WMO code → human condition
    const conditionFromCode = (code) => {
      if (code === 0) return "Clear Sky";
      if (code <= 3) return "Partly Cloudy";
      if (code <= 49) return "Foggy";
      if (code <= 69) return "Rainy";
      if (code <= 79) return "Snowy";
      if (code <= 82) return "Heavy Rain";
      return "Stormy";
    };

    // WMO code → emoji
    const emojiFromCode = (code) => {
      if (code === 0) return "☀️";
      if (code <= 2) return "🌤️";
      if (code <= 3) return "⛅";
      if (code <= 49) return "🌫️";
      if (code <= 69) return "🌧️";
      return "⛈️";
    };

    const forecast = (daily.time || []).map((date, i) => {
      const d = new Date(date + "T12:00:00");
      let dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      if (i === 0) dayName = "Today";
      
      return {
        day: dayName,
        icon: emojiFromCode(daily.weathercode?.[i] ?? 0),
        high: Math.round(daily.temperature_2m_max?.[i] ?? 25),
        low: Math.round(daily.temperature_2m_min?.[i] ?? 15),
        rainPct: daily.precipitation_probability_max?.[i] ?? 0,
      };
    });

    return {
      temp: Math.round(cur.temperature_2m ?? 28),
      humidity: cur.relative_humidity_2m ?? 65,
      windSpeed: Math.round(cur.windspeed_10m ?? 12),
      rainfall: cur.precipitation_probability ?? 10,
      condition: conditionFromCode(cur.weathercode ?? 0),
      soilMoisture: soilMoisturePct,
      forecast,
    };
  },
};
