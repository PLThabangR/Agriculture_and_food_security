import React, { useState } from "react";
import "./Advisory.css";

const days = [
  { day: "MON", date: 12, hasEvent: true, active: true },
  { day: "TUE", date: 13, hasEvent: false },
  { day: "WED", date: 14, hasEvent: true },
  { day: "THU", date: 15, hasEvent: false },
  { day: "FRI", date: 16, hasEvent: true },
  { day: "SAT", date: 17, hasEvent: false },
];

const tips = [
  {
    iconBg: "bg-teal-50",
    title: "Apply Nitrogen Fertilizer",
    desc: "Your Maize is entering the V6 stage. Apply urea (46-0-0) today for optimal stalk strength and yield potential.",
    link: "More details",
    priority: null,
  },
  {
    iconBg: "bg-blue-50",
    title: "Increase Irrigation Frequency",
    desc: "Temperatures are expected to hit 34°C. Ensure roots stay moist. Ideal time: 06:00 AM or 05:00 PM.",
    link: null,
    priority: "HIGH PRIORITY",
    border: true,
  },
  {
    iconBg: "bg-red-50",
    title: "Pest Alert: Fall Armyworm",
    desc: "Nearby farms reported sightings. Check the whorls of your sorghum plants for tiny pinholes or egg masses.",
    link: null,
    priority: null,
  },
  {
    iconBg: "bg-yellow-50",
    title: "Check Soil Moisture",
    desc: "Perform a simple squeeze test in the North field. If soil crumbles, it's time for a deep saturation cycle.",
    link: null,
    priority: null,
  },
];

export default function Advisory() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="advisory-page">
      {/* Header */}
      <header className="advisory-header">
        <div className="advisory-header-logo-section">
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden" }}>
            <img src="https://i.pravatar.cc/40?img=11" alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span className="advisory-header-logo">AgriGrow Africa</span>
        </div>
        <button className="advisory-header-help-btn">?</button>
      </header>

      <div className="advisory-content-container">
        <div className="advisory-grid">
          {/* Left Column */}
          <div className="advisory-column">
            {/* Weekly Planner Header */}
            <div>
              <p className="advisory-section-meta">PLAN YOUR GROWTH</p>
              <div className="advisory-overview-row">
                <h1 className="advisory-page-title">Weekly Planner</h1>
                <button className="advisory-link-btn">View All</button>
              </div>
            </div>

            {/* Day Selector */}
            <div className="advisory-day-list">
              {days.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`advisory-day-btn ${d.active || i === activeDay ? "active" : ""}`}
                >
                  <span className="advisory-day-lbl">{d.day}</span>
                  <span className="advisory-day-date">{d.date}</span>
                  {d.hasEvent && (
                    <span className={`advisory-day-dot ${i === activeDay || d.active ? "" : d.day === "FRI" ? "red" : ""}`} />
                  )}
                </button>
              ))}
            </div>

            {/* AI Yield Forecast Banner */}
            <div className="advisory-yield-card">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&auto=format&fit=crop&q=60"
                alt="farm"
                className="advisory-yield-bg"
              />
              <div className="advisory-yield-content">
                <div>
                  <h3 className="advisory-yield-title">AI Yield Forecast</h3>
                  <p className="advisory-yield-desc">
                    Based on current care, you are on track for a +12% increase vs last season.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="advisory-column">
            {/* Tips for Today */}
            <div className="advisory-tips-header">
              <h2 className="advisory-tips-title">Tips for Today</h2>
            </div>

            <div className="advisory-tips-list">
              {tips.map((tip, i) => (
                <div key={i} className={`advisory-tip-card ${tip.border ? "bordered" : ""}`}>
                  <div className="advisory-tip-body">
                    <div className="advisory-tip-details">
                      <h3 className="advisory-tip-title">{tip.title}</h3>
                      <p className="advisory-tip-desc">{tip.desc}</p>
                      {tip.priority && (
                        <span className="advisory-tip-badge">
                          {tip.priority}
                        </span>
                      )}
                      {tip.link && (
                        <button className="advisory-tip-link">
                          {tip.link}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
