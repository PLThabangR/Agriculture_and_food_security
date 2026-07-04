import React from "react";
import { FiGrid, FiCamera, FiCpu, FiShoppingBag, FiSun } from "react-icons/fi";

export default function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: <FiGrid size={20} /> },
    { id: "advisory", label: "Advisory", icon: <FiCpu size={20} /> },
    { id: "scanner", label: "Scanner", icon: <FiCamera size={20} /> },
    { id: "market", label: "Market", icon: <FiShoppingBag size={20} /> },
    { id: "weather", label: "Weather", icon: <FiSun size={20} /> }
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#edecff] py-3 px-4 flex items-center justify-between z-50 max-w-lg mx-auto shadow-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all ${
              isActive 
                ? "bg-[#0f5238] text-white px-4 py-2 rounded-full flex-row gap-2" 
                : "text-[#404943] hover:text-[#0f5238] px-2 py-2"
            }`}
          >
            {tab.icon}
            {isActive ? (
              <span className="text-2xs font-extrabold tracking-wide">{tab.label}</span>
            ) : (
              <span className="text-[10px] font-semibold mt-1">{tab.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
