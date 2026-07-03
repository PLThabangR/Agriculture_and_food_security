import { getConditionFromCode, getEmojiFromCode } from "../utils/weather.utils";

export const weatherService = {
  async getWeather(latitude = -27.6567, longitude = 27.2316) {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,windspeed_10m,precipitation_probability,weathercode` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max` +
      `&hourly=soil_moisture_0_to_1cm` +
      `&forecast_days=5&timezone=Africa%2FJohannesburg`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch weather data: status ${res.status}`);
    }
    const data = await res.json();

    const current = data.current || {};
    const daily = data.daily || {};
    const hourly = data.hourly || {};

    const soilMoistureRaw = hourly.soil_moisture_0_to_1cm?.slice(0, 24) || [];
    const avgSoilMoisture = soilMoistureRaw.length
      ? Math.round((soilMoistureRaw.reduce((sum, val) => sum + (val || 0), 0) / soilMoistureRaw.length) * 100)
      : 65;

    const forecast = (daily.time || []).map((date, idx) => ({
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      icon: getEmojiFromCode(daily.weathercode?.[idx] ?? 0),
      high: Math.round(daily.temperature_2m_max?.[idx] ?? 25),
      low: Math.round(daily.temperature_2m_min?.[idx] ?? 15),
      rainPct: daily.precipitation_probability_max?.[idx] ?? 0,
    }));

    return {
      temp: Math.round(current.temperature_2m ?? 28),
      humidity: current.relative_humidity_2m ?? 65,
      windSpeed: Math.round(current.windspeed_10m ?? 12),
      rainfall: current.precipitation_probability ?? 10,
      condition: getConditionFromCode(current.weathercode ?? 0),
      soilMoisture: avgSoilMoisture,
      forecast,
    };
  }
};
