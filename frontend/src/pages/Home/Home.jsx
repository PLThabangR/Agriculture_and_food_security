import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Greeting from "../../components/Greeting/Greeting";
import { apiService } from "../../services/apiService";
import "./Home.css";

export default function Home({ user, onTabChange }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async (lat = null, lon = null) => {
    try {
      setLoading(true);
      const res = await apiService.getDashboardSummary(lat, lon);
      setData(res);
    } catch (err) {
      setError("Failed to load dashboard data. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fallbackToIp = async () => {
      try {
        const ipRes = await fetch("https://ipapi.co/json/");
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          if (ipData.latitude && ipData.longitude) {
            fetchDashboardData(ipData.latitude, ipData.longitude);
            return;
          }
        }
      } catch (err) {
        console.warn("IP Geolocation fallback failed", err);
      }
      fetchDashboardData();
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchDashboardData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation denied or error, falling back to IP.", err);
          fallbackToIp();
        },
        { timeout: 5000 }
      );
    } else {
      fallbackToIp();
    }
  }, []);

  if (loading) {
    return (
      <div className="home-status-screen">
        <div className="home-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-status-screen">
        <p className="home-action-title" style={{ color: "#ef4444", marginBottom: "16px" }}>{error}</p>
        <button 
          onClick={fetchDashboardData}
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
          Try Again
        </button>
      </div>
    );
  }

  const { weather, urgentAlert, crops, marketTrends } = data || {};

  return (
    <div className="home-page">
      <Header user={user} />
      
      <div className="home-grid-columns">
        {/* Left Column */}
        <div className="home-column">
          {/* User Greeting Section */}
          <Greeting user={user} />

          {/* Local Forecast Card */}
          <section className="home-weather-card">
            <div className="home-weather-header">
              <p className="home-weather-meta">
                Local Forecast • {weather?.location?.toUpperCase()}
              </p>
              <div className="home-weather-temp-row">
                <span className="home-weather-temp">{weather?.temperature}°C</span>
                <span className="home-weather-cond">{weather?.condition}</span>
              </div>
            </div>
            
            <div className="home-recommendation">
              <p className="home-recommendation-text">
                {weather?.recommendation}
              </p>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="home-actions-list">
            <h3 className="home-section-title">Quick Actions</h3>
            
            <div className="home-actions-list">
              {/* Action 1: Scan Crop */}
              <div 
                onClick={() => onTabChange("scanner")}
                className="home-action-card"
              >
                <div className="home-action-info">
                  <div>
                    <h4 className="home-action-title">Scan Crop</h4>
                    <p className="home-action-desc">Identify pests & diseases</p>
                  </div>
                </div>
                <span className="home-action-arrow">›</span>
              </div>

              {/* Subactions: Check Prices and Advisory */}
              <div className="home-subactions-grid">
                <div 
                  onClick={() => onTabChange("market")}
                  className="home-subaction-card"
                >
                  <div>
                    <h4 className="home-subaction-title">Check Prices</h4>
                  </div>
                </div>

                <div 
                  onClick={() => onTabChange("advisory")}
                  className="home-subaction-card"
                >
                  <div>
                    <h4 className="home-subaction-title">Advisory</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div> {/* Closing Left Column */}

        {/* Right Column */}
        <div className="home-column">
          {/* Field Health */}
          <section className="home-actions-list">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <h3 className="home-section-title" style={{ margin: 0 }}>Field Health</h3>
              <button className="home-weather-meta" style={{ border: "none", background: "none", color: "#0f5238", cursor: "pointer" }}>View All</button>
            </div>

            {/* Urgent Alert Card */}
            {urgentAlert && (
              <div className="home-alert-card">
                <div>
                  <h5 className="home-alert-tag">{urgentAlert.type}</h5>
                  <p className="home-alert-message">
                    {urgentAlert.message}
                  </p>
                </div>
              </div>
            )}

            {/* Crop Cards list */}
            <div className="home-crop-grid">
              {crops?.map((crop) => (
                <div key={crop.id} className="home-crop-card">
                  <div className="home-crop-img-container">
                    <img 
                      src={crop.imageUrl} 
                      alt={crop.name} 
                      className="home-crop-img"
                    />
                    <span className="home-crop-badge">
                      {crop.status}
                    </span>
                  </div>
                  <div className="home-crop-body">
                    <div>
                      <h4 className="home-crop-title">{crop.name}</h4>
                    </div>
                    <div>
                      <div className="home-health-stats">
                        <span>Health</span>
                        <span>{crop.healthScore}%</span>
                      </div>
                      {/* Progress Bar */}
                      <div className="home-health-progress-bg">
                        <div 
                          className="home-health-progress-fill"
                          style={{ width: `${crop.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="home-crop-yield">
                        Estimated yield: {crop.estimatedYield} {crop.yieldUnit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Market Trends */}
          <section className="home-market-card">
            <div className="home-market-header">
              <h4 className="home-market-title">Market Trends</h4>
              <span className="home-market-time">
                Update 2m ago
              </span>
            </div>

            <div className="home-market-list">
              {marketTrends?.map((trend) => (
                <div key={trend.id} className="home-market-row">
                  <span className="home-market-crop-name">{trend.cropName}</span>
                  <div className="home-market-price-box">
                    <span className="home-market-price">
                      {trend.currency} {trend.price.toFixed(2)}
                    </span>
                    <span className={`home-market-change ${trend.up ? "up" : "down"}`}>
                      {trend.up ? "▲" : "▼"} {trend.changePercentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div> {/* Closing Right Column */}
      </div>
    </div>
  );
}