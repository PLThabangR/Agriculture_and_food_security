import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { weatherService } from "../../services/apiService";

const DEFAULT_WINDOWS = [
  { icon: "🚜", iconBg: "bg-orange-50", label: "Planting", sub: "Ideal Soil Moisture", badge: "NEXT 48H", badgeBg: "bg-gray-100 text-gray-600" },
  { icon: "🌿", iconBg: "bg-green-50", label: "Spraying", sub: "Low Wind Speed", badge: "OPTIMAL NOW", badgeBg: "bg-[#0f5238] text-white" },
  { icon: "🌾", iconBg: "bg-red-50", label: "Harvesting", sub: "Monitor Heat Index", badge: "DELAY (7D)", badgeBg: "bg-purple-50 text-purple-700" },
];


export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      // Kroonstad, Free State — matches Figma design location
      const data = await weatherService.getWeather(-27.6567, 27.2316);
      setWeatherData(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather(); }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#0f5238] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !weatherData) return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center gap-4 p-6">
      <p className="text-sm text-gray-500 text-center">Could not load weather data. Check your connection.</p>
      <button onClick={fetchWeather} className="px-5 py-2.5 bg-[#0f5238] text-white text-xs font-bold rounded-xl">Retry</button>
    </div>
  );

  const forecast = weatherData.forecast || [];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-28">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/40?img=11" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-[#0f5238] text-base">AgriGrow</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span className="font-medium">Live</span>
        </div>
      </header>

      <div className="px-5 pt-6 max-w-md mx-auto">
        {/* Location + Title */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1 text-xs text-[#0f5238] font-bold uppercase tracking-wide">
            <span>📍</span> KROONSTAD, FREE STATE
          </div>
        </div>
        <div className="flex items-start justify-between mb-5">
          <h1 className="text-2xl font-extrabold text-gray-900">Daily Overview</h1>
          <button onClick={fetchWeather} className={`w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all ${loading ? "animate-spin" : ""}`}>
            <FiRefreshCw className="text-sm" />
          </button>
        </div>

        {/* Current Conditions Card */}
        <div className="bg-[#0f5238] rounded-2xl p-5 shadow-lg mb-6">
          <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-3">Current Conditions</p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-extrabold text-white mb-1">{weatherData.temp}°C</div>
              <div className="text-sm text-white/70">{weatherData.condition}</div>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex flex-col items-center justify-center">
                <span className="text-2xl">💧</span>
                <span className="text-lg font-extrabold text-white leading-none">{weatherData.soilMoisture}%</span>
                <span className="text-[9px] text-white/60 uppercase font-bold mt-0.5">SOIL MOISTURE</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between bg-white/10 rounded-xl px-4 py-2.5">
            <div className="flex items-center gap-2 text-white text-xs">
              <span>💧</span>
              <span>Optimal moisture for maize</span>
            </div>
            <span className="text-[10px] font-bold text-white/70 bg-white/15 px-2 py-0.5 rounded-full">STABLE</span>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">5-DAY FORECAST</span>
          <button className="text-xs font-bold text-[#0f5238] hover:underline">Details</button>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {forecast.map((f, i) => (
            <div key={i} className={`flex flex-col items-center gap-2 min-w-[64px] py-3 px-2 rounded-xl border transition-all ${i === 2 ? "bg-[#0f5238] border-[#0f5238] shadow-md" : "bg-white border-gray-200"}`}>
              <span className={`text-[11px] font-bold ${i === 2 ? "text-white/70" : "text-gray-500"}`}>{f.day}</span>
              <span className="text-lg">{f.icon}</span>
              <span className={`text-sm font-extrabold ${i === 2 ? "text-white" : "text-gray-800"}`}>{f.high}°</span>
              <span className={`text-xs ${i === 2 ? "text-white/50" : "text-gray-400"}`}>{f.low}°</span>
            </div>
          ))}
        </div>

        {/* Risk Advisory */}
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">RISK ADVISORY</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">❄️</div>
            <p className="text-sm font-bold text-gray-900">Frost Risk</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-xs text-gray-500">Low (Next 7 days)</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">💨</div>
            <p className="text-sm font-bold text-gray-900">Wind Speed</p>
            <p className="text-xl font-extrabold text-gray-900 mt-1">{weatherData.windSpeed} km/h</p>
            <p className="text-xs text-gray-500">Safe for spraying</p>
          </div>
        </div>

        {/* Rainfall Probability */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-900">Rainfall Probability</p>
            <span className="text-lg">☂️</span>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 mb-1">{weatherData.rainfall}% <span className="text-sm font-normal text-gray-400">(2mm Accumulation)</span></p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div className="bg-[#0f5238] h-2 rounded-full transition-all" style={{ width: `${weatherData.rainfall}%` }} />
          </div>
        </div>

        {/* Optimal Windows */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">📅</span>
            <h2 className="text-base font-extrabold text-gray-900">Optimal Windows</h2>
          </div>
          <div className="flex flex-col gap-3">
            {DEFAULT_WINDOWS.map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${w.iconBg} flex items-center justify-center text-lg flex-shrink-0`}>
                  {w.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{w.label}</p>
                  <p className="text-xs text-gray-400">{w.sub}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${w.badgeBg}`}>
                  {w.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attribution */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4">
          <span>ℹ️</span>
          <span>Data via Open-Meteo • Updated just now</span>
        </div>
      </div>
    </div>
  );
}
