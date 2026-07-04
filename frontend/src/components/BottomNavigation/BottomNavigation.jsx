import React from "react";
import { FiGrid, FiCamera, FiCpu, FiShoppingBag, FiSun } from "react-icons/fi";
import "./BottomNavigation.css";

export default function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: <FiGrid size={20} /> },
    { id: "advisory", label: "Advisory", icon: <FiCpu size={20} /> },
    { id: "scanner", label: "Scanner", icon: <FiCamera size={20} /> },
    { id: "market", label: "Market", icon: <FiShoppingBag size={20} /> },
    { id: "weather", label: "Weather", icon: <FiSun size={20} /> }
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`bottom-nav-btn ${isActive ? "active" : ""}`}
          >
            {tab.icon}
            {isActive ? (
              <span className="bottom-nav-label-active">{tab.label}</span>
            ) : (
              <span className="bottom-nav-label-inactive">{tab.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
