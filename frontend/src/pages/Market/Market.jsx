import React, { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import "./Market.css";

const CHART_POINTS = [2200, 2500, 2300, 2800, 3000, 2700, 3200, 3400, 3100, 3600, 3900, 4100, 4320];

function Sparkline({ points, color = "#0f5238" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 320, h = 80;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map(v => h - ((v - min) / range) * (h - 16) - 4);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");
  const area = `${path} L ${xs[xs.length-1]} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "80px" }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1={h * 0.6} x2={w} y2={h * 0.6} stroke="#e5e7eb" strokeDasharray="4,4" strokeWidth="1" />
      <path d={area} fill="url(#chartGrad)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="5" fill={color} />
    </svg>
  );
}

export default function Market() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("just now");

  useEffect(() => {
    apiService.getMarketTrends()
      .then(data => {
        setTrends(data);
        setLastUpdate("just now");
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="home-status-screen">
      <div className="home-spinner" />
    </div>
  );

  return (
    <div className="market-page">
      {/* Header */}
      <header className="market-header">
        <div className="market-header-logo-section">
          <span className="market-header-logo">AgriGrow Africa</span>
        </div>
        <button className="market-header-help-btn">?</button>
      </header>

      <div className="market-content-container">
        <div className="market-grid">
          {/* Left Column */}
          <div className="market-column">
            {/* Market Insights Header */}
            <p className="market-section-meta">MARKET INSIGHTS</p>
            {error && (
              <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "#fef2f2", border: "1px solid #fee2e2", fontSize: "12px", color: "#b91c1c", fontWeight: "600", marginBottom: "16px" }}>
                Backend not reachable. Showing cached data. Start the Spring Boot server.
              </div>
            )}
            <div className="market-overview-row">
              <div>
                <h1 className="market-page-title">
                  {trends[0]?.cropName || "White Maize"}<br />Trend
                </h1>
              </div>
              <div className="market-header-price-info">
                <p className="market-header-price-val">
                  {trends[0]?.currency || "R"}<br />{(trends[0]?.price || 4320).toLocaleString()}.00
                </p>
                <p className={`market-header-change-lbl ${trends[0]?.up ? "up" : "down"}`}>
                  {trends[0]?.changePercentage || 1.4}%
                </p>
              </div>
            </div>

            {/* Price Chart */}
            <div className="market-sparkline-card">
              <div className="market-sparkline-header">
                <span className="market-sparkline-title">3-Month Forecast</span>
                <span className="market-sparkline-badge">High Confidence</span>
              </div>
              <Sparkline points={CHART_POINTS} />
            </div>
          </div> {/* Closing Left Column */}

          {/* Right Column */}
          <div className="market-column">
            {/* SAFEX Market Board */}
            <div className="market-board-header">
              <h2 className="market-board-title">SAFEX Market Board</h2>
            </div>

            <div className="market-board-list">
              {(trends.length > 0 ? trends : [
                { id: 1, cropName: "White Maize", currency: "R", price: 4320, changePercentage: 1.4, up: true },
                { id: 2, cropName: "Yellow Maize", currency: "R", price: 4180, changePercentage: 0.2, up: false },
                { id: 3, cropName: "Sunflower Seeds", currency: "R", price: 8950, changePercentage: 2.8, up: true },
                { id: 4, cropName: "Sorghum", currency: "R", price: 3850, changePercentage: 0.0, up: true },
              ]).map((c) => {
                return (
                  <div key={c.id} className="market-board-card">
                    <div className="market-board-info">
                      <p className="market-board-name">{c.cropName}</p>
                      <p className="market-board-meta">Per Metric Ton • {c.currency}</p>
                    </div>
                    <div className="market-board-price-box">
                      <p className="market-board-price-val">{c.currency} {Number(c.price).toLocaleString()}.00</p>
                      <p className={`market-board-change-val ${c.up ? "up" : "down"}`}>
                        {c.changePercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Source attribution */}
            <p className="market-attribution-row">
              Sourced via SAFEX records • Last cached {lastUpdate}
            </p>
            <p className="market-attribution-row" style={{ fontWeight: 600 }}>
              Verified Transaction Data
            </p>

            {/* CTA Banner */}
            <div className="market-cta-banner">
              <img
                src="https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=400&auto=format&fit=crop&q=60"
                alt="corn"
                className="market-cta-bg"
              />
              <div className="market-cta-content">
                <div style={{ flex: 1 }}>
                  <h3 className="market-cta-title">Optimize your harvest value</h3>
                  <p className="market-cta-desc">
                    Our AI predicts a peak in Maize prices next month. Connect with local buyers now.
                  </p>
                  <button className="market-cta-btn">
                    Find Buyers
                  </button>
                </div>
              </div>
            </div>
          </div> {/* Closing Right Column */}
        </div> {/* Closing Grid Container */}
      </div> {/* Closing Max-Width Wrapper */}
    </div>
  );
}
