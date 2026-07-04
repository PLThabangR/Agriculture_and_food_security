import React, { useState, useEffect } from "react";
import { weatherService } from "../../services/apiService";
import "./Weather.css";

const DEFAULT_WINDOWS = [
  { label: "Planting", sub: "Ideal Soil Moisture", badge: "NEXT 48H", badgeBg: "bg-gray-100" },
  { label: "Spraying", sub: "Low Wind Speed", badge: "OPTIMAL NOW", badgeBg: "bg-green-brand" },
  { label: "Harvesting", sub: "Monitor Heat Index", badge: "DELAY (7D)", badgeBg: "bg-purple-light" },
];

export default function Weather() {
  const [locationName, setLocationName] = useState("KROONSTAD, FREE STATE");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);

    let lat = -27.6567;
    let lon = 27.2316;

    const getCoordinates = () => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve(null);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          () => {
            resolve(null);
          },
          { timeout: 8000 }
        );
      });
    };

    try {
      let coords = await getCoordinates();
      
      // Fallback to IP-based location if browser geolocation fails or is denied
      if (!coords) {
        try {
          const ipRes = await fetch("https://ipapi.co/json/");
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            if (ipData.latitude && ipData.longitude) {
              coords = { lat: ipData.latitude, lon: ipData.longitude };
            }
          }
        } catch (ipErr) {
          console.warn("IP Geolocation fallback failed", ipErr);
        }
      }

      if (coords) {
        lat = coords.lat;
        lon = coords.lon;

        try {
          const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            const city = geoData.city || geoData.locality || geoData.principalSubdivision || "Detected Location";
            setLocationName(city.toUpperCase());
          }
        } catch (geoErr) {
          console.error("Geocoding failed, using coordinates", geoErr);
          setLocationName(`${lat.toFixed(4)}°S, ${lon.toFixed(4)}°E`);
        }
      } else {
        setLocationName("KROONSTAD, FREE STATE");
      }

      const data = await weatherService.getWeather(lat, lon);
      setWeatherData(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return (
    <div className="home-status-screen">
      <div className="home-spinner" />
    </div>
  );

  if (error || !weatherData) return (
    <div className="home-status-screen">
      <p className="home-action-title" style={{ color: "#ef4444", marginBottom: "16px" }}>Could not load weather data. Check your connection.</p>
      <button 
        onClick={fetchWeather}
        className="home-subaction-title"
        style={{
          padding: "10px 20px",
          borderRadius: "9999px",
          backgroundColor: "#0f5238",
          color: "#ffffff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Retry
      </button>
    </div>
  );

  const forecast = weatherData.forecast || [];
  
  const windows = [
    { 
      label: "Planting", 
      sub: "Soil Moisture", 
      badge: weatherData.soilMoisture > 20 ? "OPTIMAL NOW" : "DELAY", 
      badgeBg: weatherData.soilMoisture > 20 ? "bg-green-brand" : "bg-purple-light" 
    },
    { 
      label: "Spraying", 
      sub: "Wind Speed", 
      badge: weatherData.windSpeed < 15 && weatherData.rainfall < 30 ? "OPTIMAL NOW" : "DELAY", 
      badgeBg: weatherData.windSpeed < 15 && weatherData.rainfall < 30 ? "bg-green-brand" : "bg-purple-light" 
    },
    { 
      label: "Harvesting", 
      sub: "Rain Probability", 
      badge: forecast.some(f => f.rainPct > 50) ? "DELAY (RAIN)" : "OPTIMAL NOW", 
      badgeBg: forecast.some(f => f.rainPct > 50) ? "bg-purple-light" : "bg-green-brand" 
    },
  ];

  return (
    <div className="weather-page">
      {/* Header */}
      <header className="weather-header">
        <div className="weather-header-logo-section">
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden" }}>
            
          </div>
          <span className="weather-header-logo">AgriGrow</span>
        </div>
        <div className="weather-badge-live">
          <span className="weather-badge-dot"></span>
          <span style={{ fontWeight: 500 }}>Live</span>
        </div>
      </header>

      <div className="weather-content-container">
        <div className="weather-grid">
          {/* Left Column */}
          <div className="weather-column">
            {/* Location + Title */}
            <div>
              <div className="weather-location-meta">
                {locationName}
              </div>
            </div>
            
            <div className="weather-overview-row">
              <h1 className="weather-page-title">Daily Overview</h1>
              <button 
                onClick={fetchWeather} 
                className="weather-refresh-btn"
                style={{ fontSize: "12px", fontWeight: "bold" }}
              >
                Reload
              </button>
            </div>

            {/* Current Conditions Card */}
            <div className="weather-current-card">
              <p className="weather-current-meta">Current Conditions</p>
              <div className="weather-current-layout">
                <div>
                  <div className="weather-current-temp">{weatherData.temp}°C</div>
                  <div className="weather-current-cond">{weatherData.condition}</div>
                </div>
                <div>
                  <div className="weather-soil-box">
                    <span className="weather-soil-value">{weatherData.soilMoisture}%</span>
                    <span className="weather-soil-lbl">SOIL MOISTURE</span>
                  </div>
                </div>
              </div>
              <div className="weather-current-tip-row">
                <div className="weather-current-tip-txt">
                  Optimal moisture for maize
                </div>
                <span className="weather-current-tip-badge">STABLE</span>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div>
              <div className="weather-section-header">
                <span className="weather-section-title">5-Day Forecast</span>
                <button className="weather-link-btn">Details</button>
              </div>
              <div className="weather-forecast-list">
                {forecast.map((f, i) => (
                  <div key={i} className="weather-forecast-card">
                    <span className="weather-forecast-day">{f.day}</span>
                    <span className="weather-forecast-icon" style={{ fontSize: "20px", margin: "4px 0" }}>{f.icon}</span>
                    <span className="weather-forecast-temp-max">{f.high}°</span>
                    <span className="weather-forecast-temp-min">{f.low}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="weather-column">
            {/* Risk Advisory */}
            <div>
              <p className="weather-section-title" style={{ marginBottom: "12px" }}>RISK ADVISORY</p>
              <div className="weather-risk-grid">
                <div className="weather-risk-card">
                  <p className="weather-risk-title">Frost Risk</p>
                  <div className="weather-risk-status-row">
                    <span className="weather-risk-dot" style={{ backgroundColor: forecast.some(f => f.low <= 4) ? "#ef4444" : "#10b981" }}></span>
                    <span className="weather-risk-desc">{forecast.some(f => f.low <= 4) ? "High (Next 5 days)" : "Low (Next 5 days)"}</span>
                  </div>
                </div>
                <div className="weather-risk-card">
                  <p className="weather-risk-title">Wind Speed</p>
                  <p className="weather-risk-value" style={{ marginTop: "4px" }}>{weatherData.windSpeed} km/h</p>
                  <p className="weather-risk-desc">{weatherData.windSpeed > 15 ? "High wind warning" : "Safe for spraying"}</p>
                </div>
              </div>
            </div>

            {/* Rainfall Probability */}
            <div className="weather-rain-card">
              <div className="weather-rain-header">
                <p className="weather-rain-title">Rainfall Probability</p>
              </div>
              <p className="weather-rain-val">
                {weatherData.rainfall}% <span className="weather-rain-sub">(2mm Accumulation)</span>
              </p>
              <div className="weather-progress-bg">
                <div className="weather-progress-fill" style={{ width: `${weatherData.rainfall}%` }} />
              </div>
            </div>

            {/* Optimal Windows */}
            <div className="weather-window-card">
              <div className="weather-window-header">
                <h2 className="weather-window-title">Optimal Windows</h2>
              </div>
              <div className="weather-window-list">
                {windows.map((w, i) => (
                  <div key={i} className="weather-window-row">
                    <div className="weather-window-info">
                      <p className="weather-window-label">{w.label}</p>
                      <p className="weather-window-sub">{w.sub}</p>
                    </div>
                    <span className={`weather-window-badge ${w.badgeBg}`}>{w.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> {/* Closing Right Column */}
        </div> {/* Closing Grid Container */}

        {/* Attribution */}
        <div className="weather-attribution">
          <span>Data via Open-Meteo • Updated just now</span>
        </div>
      </div>
    </div>
  );
}
