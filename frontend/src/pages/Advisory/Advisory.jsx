import React, { useState } from "react";

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
    icon: "🧪",
    iconBg: "bg-teal-50",
    title: "Apply Nitrogen Fertilizer",
    desc: "Your Maize is entering the V6 stage. Apply urea (46-0-0) today for optimal stalk strength and yield potential.",
    link: "More details",
    priority: null,
  },
  {
    icon: "💧",
    iconBg: "bg-blue-50",
    title: "Increase Irrigation Frequency",
    desc: "Temperatures are expected to hit 34°C. Ensure roots stay moist. Ideal time: 06:00 AM or 05:00 PM.",
    link: null,
    priority: "HIGH PRIORITY",
    border: true,
  },
  {
    icon: "🐛",
    iconBg: "bg-red-50",
    title: "Pest Alert: Fall Armyworm",
    desc: "Nearby farms reported sightings. Check the whorls of your sorghum plants for tiny pinholes or egg masses.",
    link: null,
    priority: null,
  },
  {
    icon: "⚡",
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
    <div className="min-h-screen bg-gray-50 font-sans pb-28">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/40?img=11" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-[#0f5238] text-base">AgriGrow Africa</span>
        </div>
        <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">?</button>
      </header>

      <div className="px-5 pt-6 max-w-md mx-auto">
        {/* Weekly Planner Header */}
        <p className="text-xs font-bold text-[#0f5238] uppercase tracking-widest mb-1">PLAN YOUR GROWTH</p>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-extrabold text-gray-900">Weekly Planner</h1>
          <button className="text-xs font-bold text-[#0f5238] hover:underline">View All</button>
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex flex-col items-center gap-1 min-w-[52px] py-3 rounded-xl transition-all ${
                d.active || i === activeDay
                  ? "bg-[#0f5238] text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-500"
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wide opacity-70">{d.day}</span>
              <span className="text-base font-extrabold">{d.date}</span>
              {d.hasEvent && (
                <span className={`w-1.5 h-1.5 rounded-full ${i === activeDay || d.active ? "bg-white" : d.day === "FRI" ? "bg-red-400" : "bg-[#0f5238]"}`} />
              )}
            </button>
          ))}
        </div>

        {/* Tips for Today */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#0f5238]">✨</span>
          <h2 className="text-lg font-extrabold text-gray-900">Tips for Today</h2>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          {tips.map((tip, i) => (
            <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border ${tip.border ? "border-l-4 border-l-[#0f5238] border-gray-100" : "border-gray-100"}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${tip.iconBg} flex items-center justify-center text-lg flex-shrink-0`}>
                  {tip.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
                  {tip.priority && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded uppercase tracking-wide">
                      {tip.priority}
                    </span>
                  )}
                  {tip.link && (
                    <button className="mt-2 text-xs font-bold text-[#0f5238] flex items-center gap-1 hover:underline">
                      {tip.link} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Yield Forecast Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0f5238] p-6 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&auto=format&fit=crop&q=60"
            alt="farm"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white mb-1">AI Yield Forecast</h3>
              <p className="text-xs text-white/75 leading-relaxed max-w-[180px]">
                Based on current care, you are on track for a +12% increase vs last season.
              </p>
            </div>
            <div className="text-4xl text-[#b1f0ce] opacity-80">📈</div>
          </div>
        </div>
      </div>
    </div>
  );
}
