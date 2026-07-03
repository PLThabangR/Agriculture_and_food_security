import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Greeting from "../../components/Greeting/Greeting";
import { apiService } from "../../services/apiService";
import { FiSun, FiThumbsUp, FiCamera, FiTrendingUp, FiCpu, FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function Home({ user, onTabChange }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await apiService.getDashboardSummary();
      setData(res);
    } catch (err) {
      setError("Failed to load dashboard data. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf8ff] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0f5238] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fbf8ff] flex flex-col items-center justify-center p-6 text-center">
        <FiAlertTriangle className="text-red-500 text-5xl mb-4" />
        <p className="text-sm font-semibold text-[#181a2e] mb-4">{error}</p>
        <button 
          onClick={fetchDashboardData}
          className="px-5 py-2.5 rounded-full text-white bg-[#0f5238] hover:bg-[#2d6a4f] text-xs font-bold transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { weather, urgentAlert, crops, marketTrends } = data || {};

  return (
    <div className="pb-24 max-w-lg mx-auto bg-[#fbf8ff] min-h-screen">
      <Header user={user} />
      
      <div className="px-gutter-mobile flex flex-col gap-stack-lg">
        {/* User Greeting Section */}
        <Greeting user={user} />

        {/* Local Forecast Card */}
        <section className="bg-[#0f5238] text-white rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-[#0f5238]/10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-3xs uppercase tracking-widest text-[#b1f0ce] font-bold flex items-center gap-1.5">
                <FiSun className="text-xs" /> Local Forecast • {weather?.location?.toUpperCase()}
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold">{weather?.temperature}°C</span>
                <span className="text-sm text-white/80 font-medium">{weather?.condition}</span>
              </div>
            </div>
            {/* Big Sun Decorative Graphic */}
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/10 text-5xl font-black absolute -top-2 -right-2 transform rotate-12 scale-150">

            </div>
          </div>
          
          <div className="bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#b1f0ce]/20 flex items-center justify-center text-[#b1f0ce] flex-shrink-0">
              <FiThumbsUp size={16} />
            </div>
            <p className="text-xs text-white/90 font-medium">
              {weather?.recommendation}
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="flex flex-col gap-stack-md">
          <h3 className="text-base font-extrabold text-[#181a2e] font-display">Quick Actions</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Action 1: Scan Crop */}
            <div 
              onClick={() => onTabChange("scanner")}
              className="bg-white p-5 rounded-2xl border border-[#edecff] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#7e5800]/10 flex items-center justify-center text-[#7e5800]">
                  <FiCamera size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#181a2e]">Scan Crop</h4>
                  <p className="text-3xs text-[#404943] mt-0.5">Identify pests & diseases</p>
                </div>
              </div>
              <span className="text-[#404943] text-lg font-bold">›</span>
            </div>

            {/* Subactions: Check Prices and Advisory */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => onTabChange("market")}
                className="bg-white p-5 rounded-2xl border border-[#edecff] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#a7373b]">
                  <FiTrendingUp size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#181a2e]">Check Prices</h4>
                </div>
              </div>

              <div 
                onClick={() => onTabChange("advisory")}
                className="bg-white p-5 rounded-2xl border border-[#edecff] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#b1f0ce]/30 flex items-center justify-center text-[#0f5238]">
                  <FiCpu size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#181a2e]">Advisory</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Field Health */}
        <section className="flex flex-col gap-stack-md">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-[#181a2e] font-display">Field Health</h3>
            <button className="text-xs font-bold text-[#0f5238] hover:underline">View All</button>
          </div>

          {/* Urgent Alert Card */}
          {urgentAlert && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5">
                <FiAlertTriangle size={18} />
              </div>
              <div>
                <h5 className="text-2xs font-extrabold text-red-800 uppercase tracking-widest">{urgentAlert.type}</h5>
                <p className="text-xs text-red-700 leading-relaxed mt-1 font-medium">
                  {urgentAlert.message}
                </p>
              </div>
            </div>
          )}

          {/* Crop Cards list */}
          <div className="grid grid-cols-2 gap-4">
            {crops?.map((crop) => (
              <div key={crop.id} className="bg-white rounded-2xl border border-[#edecff] shadow-sm overflow-hidden flex flex-col">
                <div className="h-28 bg-slate-100 relative">
                  <img 
                    src={crop.imageUrl} 
                    alt={crop.name} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#b1f0ce] text-[#0f5238] text-3xs font-extrabold tracking-widest uppercase">
                    {crop.status}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-extrabold text-[#181a2e]">{crop.name}</h4>
                  </div>
                  <div>
                    <div className="flex justify-between text-3xs text-[#404943] font-semibold mb-1">
                      <span>Health</span>
                      <span>{crop.healthScore}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-[#edecff] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#0f5238] rounded-full"
                        style={{ width: `${crop.healthScore}%` }}
                      ></div>
                    </div>
                    <span className="block text-3xs text-[#404943]/80 mt-2 font-medium">
                      Estimated yield: {crop.estimatedYield} {crop.yieldUnit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Trends */}
        <section className="bg-white rounded-2xl border border-[#edecff] p-5 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[#edecff] pb-3">
            <h4 className="text-2xs font-extrabold text-[#404943] uppercase tracking-widest">Market Trends</h4>
            <span className="text-3xs text-[#404943]/60 flex items-center gap-1">
              Update 2m ago <FiRefreshCw className="text-[10px]" />
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {marketTrends?.map((trend) => (
              <div key={trend.id} className="flex justify-between items-center">
                <span className="text-xs font-semibold text-[#181a2e]">{trend.cropName}</span>
                <div className="text-right">
                  <span className="block text-xs font-extrabold text-[#181a2e]">
                    {trend.currency} {trend.price.toFixed(2)}
                  </span>
                  <span className={`text-3xs font-bold flex items-center justify-end gap-0.5 mt-0.5 ${trend.up ? "text-green-600" : "text-red-500"}`}>
                    {trend.up ? "▲" : "▼"} {trend.changePercentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}