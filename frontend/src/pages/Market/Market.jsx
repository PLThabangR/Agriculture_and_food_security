import React, { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";

// Icon mapping for commodity types
const ICONS = {
  default: { icon: "🌾", iconBg: "bg-yellow-50" },
  maize:   { icon: "🌽", iconBg: "bg-green-100" },
  wheat:   { icon: "🌾", iconBg: "bg-yellow-100" },
  soya:    { icon: "🫘", iconBg: "bg-orange-100" },
  sunflower: { icon: "🌻", iconBg: "bg-orange-100" },
  sorghum: { icon: "🌾", iconBg: "bg-purple-50" },
  coffee:  { icon: "☕", iconBg: "bg-amber-50" },
  cocoa:   { icon: "🍫", iconBg: "bg-brown-50" },
};

function getCommodityIcon(name = "") {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(ICONS)) {
    if (lower.includes(key)) return val;
  }
  return ICONS.default;
}

// Simulated chart data points
const CHART_POINTS = [2200,2500,2300,2800,3000,2700,3200,3400,3100,3600,3900,4100,4320];

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
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        {/* Dashed reference line */}
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

  // Show loading
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#0f5238] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-28">
      {/* Offline banner */}

      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/40?img=11" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-[#0f5238] text-base">AgriGrow Africa</span>
        </div>
        <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">?</button>
      </header>

      <div className="px-5 pt-6 max-w-md mx-auto">
        {/* Market Insights Header */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">MARKET INSIGHTS</p>
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 font-semibold">
            Backend not reachable. Showing cached data. Start the Spring Boot server.
          </div>
        )}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
              {trends[0]?.cropName || "White Maize"}<br />Trend
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xl font-extrabold text-gray-900">
              {trends[0]?.currency || "R"}<br />{(trends[0]?.price || 4320).toLocaleString()}.00
            </p>
            <p className={`text-xs font-bold flex items-center justify-end gap-0.5 ${trends[0]?.up ? "text-green-500" : "text-red-500"}`}>
              <span>{trends[0]?.up ? "↗" : "↘"}</span> {trends[0]?.changePercentage || 1.4}%
            </p>
          </div>
        </div>

        {/* Price Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 font-medium">3-Month Forecast</span>
            <span className="px-3 py-1 bg-[#0f5238] text-white text-xs font-bold rounded-full">High Confidence</span>
          </div>
          <Sparkline points={CHART_POINTS} />
        </div>

        {/* SAFEX Market Board */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-gray-900">SAFEX Market Board</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 mb-5">
          {(trends.length > 0 ? trends : [
            { id: 1, cropName: "White Maize", currency: "R", price: 4320, changePercentage: 1.4, up: true },
            { id: 2, cropName: "Yellow Maize", currency: "R", price: 4180, changePercentage: 0.2, up: false },
            { id: 3, cropName: "Sunflower Seeds", currency: "R", price: 8950, changePercentage: 2.8, up: true },
            { id: 4, cropName: "Sorghum", currency: "R", price: 3850, changePercentage: 0.0, up: true },
          ]).map((c) => {
            const { icon, iconBg } = getCommodityIcon(c.cropName);
            return (
              <div key={c.id} className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center text-xl flex-shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{c.cropName}</p>
                  <p className="text-xs text-gray-400">Per Metric Ton • {c.currency}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-gray-900">{c.currency} {Number(c.price).toLocaleString()}.00</p>
                  <p className={`text-xs font-bold flex items-center justify-end gap-0.5 ${c.up ? "text-green-500" : c.changePercentage === 0 ? "text-gray-400" : "text-red-500"}`}>
                    {c.up ? "↑" : c.changePercentage === 0 ? "—" : "↓"} {Math.abs(c.changePercentage).toFixed(1)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Source attribution */}
        <p className="text-center text-xs text-gray-400 mb-1">Sourced via SAFEX records • Last cached {lastUpdate}</p>
        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1 mb-8">
          <span>✅</span> Verified Transaction Data
        </p>

        {/* CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0f5238] p-6 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=400&auto=format&fit=crop&q=60"
            alt="corn"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-base font-extrabold text-white mb-2">Optimize your harvest value</h3>
              <p className="text-xs text-white/75 leading-relaxed mb-4">
                Our AI predicts a peak in Maize prices next month. Connect with local buyers now.
              </p>
              <button className="px-5 py-2.5 bg-white text-[#0f5238] text-xs font-extrabold rounded-xl hover:bg-gray-100 transition-colors shadow">
                Find Buyers
              </button>
            </div>
            <div className="text-4xl opacity-60">🌽</div>
          </div>
        </div>
      </div>
    </div>
  );
}
