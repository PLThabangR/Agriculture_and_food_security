import React, { useState, useRef } from "react";
import { apiService } from "../../services/apiService";

const RECENT = [
  { name: "Maize Rust", status: "TREATED", statusColor: "bg-[#0f5238] text-white", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Puccinia_sorghi_on_corn.jpg/320px-Puccinia_sorghi_on_corn.jpg" },
  { name: "Healthy Sorghum", status: "STABLE", statusColor: "bg-gray-100 text-gray-600", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Sorghum_bicolor_MS3.jpg/320px-Sorghum_bicolor_MS3.jpg" },
  { name: "Potato Blight", status: "ACTION REQ", statusColor: "bg-red-100 text-red-600", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Alternaria_solani_-_potato_early_blight.jpg/320px-Alternaria_solani_-_potato_early_blight.jpg" },
  { name: "Arabica Coffee", status: "HEALTHY", statusColor: "bg-gray-100 text-gray-600", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/320px-Roasted_coffee_beans.jpg" },
];

// Sub-component for the scan result view
function ScanResult({ scan, onBack, onAddToPlanner }) {
  const disease = scan?.diseaseName || "Maize Leaf Rust (Puccinia sorghi)";
  const confidence = scan?.confidence || 98;
  const advice = scan?.advice || "Treat with triazole foliar sprays.";
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans pb-28">
      {/* Offline banner */}
      <div className="bg-gray-900 text-white text-center text-xs py-2 flex items-center justify-center gap-2">
        <span>🔌</span> Offline Mode: Data cached for Free State Region
      </div>
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/40?img=11" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-[#0f5238] text-base">AgriGrow Africa</span>
        </div>
        <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">?</button>
      </header>

      {/* Scan image with overlay */}
      <div className="relative bg-black overflow-hidden" style={{ height: 220 }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Puccinia_sorghi_on_corn.jpg/640px-Puccinia_sorghi_on_corn.jpg"
          alt="scan"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Corner frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-52 h-36 border-2 border-[#b1f0ce] rounded-lg">
            <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl" />
            <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr" />
            <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-white rounded-br" />
            {/* Cross-hair center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-6 bg-[#b1f0ce]/60" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-px w-6 bg-[#b1f0ce]/60" />
            </div>
          </div>
        </div>
        {/* Priority badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
          ⚠️ High Priority Action Required
        </div>
        {/* Bottom tabs */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-white/70 text-xs">📷</span>
            <span className="text-white/50 text-[9px]">Gallery</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-[#0f5238]/80 px-4 py-1 rounded-full">
            <span className="text-white text-[10px] font-bold">Capture</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-white/70 text-xs">⚙️</span>
            <span className="text-white/50 text-[9px]">Settings</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 max-w-md mx-auto w-full">
        {/* Disease Name */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5">
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">{disease} Detected</h2>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#0f5238] text-white text-xs font-extrabold rounded-full">{confidence}% Confidence</span>
            <span className="text-xs text-gray-400">Processed On-Device</span>
          </div>
        </div>

        {/* Remediation Strategy */}
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">REMEDIATION STRATEGY</p>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Scout Fields</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Check sectors B4 & C2 for infection threshold levels.</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">🧪</div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Apply Fungicide</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Use registered SA triazole foliar sprays (approx. R450/ha).</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">💧</div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">AI Advice</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{advice}</p>
          </div>
        </div>

        {/* Add to Planner */}
        <button
          onClick={onAddToPlanner}
          className="w-full py-4 bg-[#0f5238] text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 hover:bg-[#2d6a4f] transition-colors shadow-md mb-3"
        >
          📅 Add to Weekly Planner
        </button>
        <p className="text-center text-xs text-gray-400 mb-4">Estimated remediation cost for 5ha: R2,250.00</p>
      </div>
    </div>
  );
}

export default function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [addedToPlanner, setAddedToPlanner] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const handleScan = async () => {
    setScanning(true);
    setError("");
    try {
      // POST to backend with crop name (demo: Maize)
      const result = await apiService.scanCrop(null, "Maize");
      setScanData(result);
      setShowResult(true);
    } catch (e) {
      setError("Scan failed. Make sure the backend is running on port 8080.");
    } finally {
      setScanning(false);
    }
  };

  const handleAddToPlanner = () => {
    setAddedToPlanner(true);
    setTimeout(() => {
      setShowResult(false);
      setAddedToPlanner(false);
    }, 1500);
  };

  if (showResult) {
    return <ScanResult scan={scanData} onBack={() => setShowResult(false)} onAddToPlanner={handleAddToPlanner} />;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] font-sans pb-24">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/40?img=11" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-white text-base">AgriGrow Africa</span>
        </div>
        <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60">?</button>
      </header>

      {/* Instruction Banner */}
      <div className="mx-5 mt-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2">
        <span className="text-[#b1f0ce] text-sm">ℹ️</span>
        <p className="text-white/80 text-xs leading-relaxed">Position the affected leaf clearly within the white frame. Ensure bright natural light.</p>
      </div>

      {/* Camera View */}
      <div className="relative mx-0 mt-4 overflow-hidden" style={{ height: 340 }}>
        <img
          src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80"
          alt="camera view"
          className="w-full h-full object-cover opacity-80"
        />
        {/* Scan overlay frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative border-2 ${scanning ? "border-[#b1f0ce] shadow-[0_0_20px_#b1f0ce55]" : "border-white"} rounded-lg transition-all`} style={{ width: 260, height: 200 }}>
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-3 border-l-3 border-white rounded-tl" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-3 border-r-3 border-white rounded-tr" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-3 border-l-3 border-white rounded-bl" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-3 border-r-3 border-white rounded-br" />
            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[#b1f0ce] font-bold text-xs animate-pulse">Analyzing...</div>
              </div>
            )}
          </div>
        </div>

        {/* Status bar overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-5 py-3 flex items-center justify-between text-xs text-white/80">
          <span>Status: <span className="font-bold text-[#b1f0ce]">Rust Detected</span></span>
          <span>Confidence: <span className="font-bold">98%</span></span>
          <span>Sample ID: <span className="font-bold">MZ-RUST-001</span></span>
        </div>

        {/* Side action buttons */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">⚡</button>
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">🔍</button>
        </div>
      </div>

      {/* Scan Button + History */}
      <div className="px-5 mt-5 flex items-center gap-3">
        <button
          onClick={handleScan}
          disabled={scanning}
          className={`flex-1 py-4 font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
            scanning ? "bg-[#2d6a4f] text-white cursor-wait" : "bg-[#0f5238] text-white hover:bg-[#2d6a4f]"
          }`}
        >
          📷 {scanning ? "Scanning..." : "Scan Now"}
        </button>
        <button className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm hover:bg-gray-50 transition-colors">
          🕐
        </button>
      </div>

      {/* Recent Identifications */}
      <div className="px-5 mt-7 pb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-white">Recent Identifications</h2>
          <button className="text-xs font-bold text-[#b1f0ce] hover:underline">See All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {RECENT.map((r, i) => (
            <div key={i} className="flex-shrink-0 w-36 bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="relative h-24">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-gray-900 mb-1.5">{r.name}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${r.statusColor}`}>
                  {r.status === "TREATED" && "✅ "}
                  {r.status === "STABLE" && "⚪ "}
                  {r.status === "ACTION REQ" && "⚠️ "}
                  {r.status === "HEALTHY" && "⚪ "}
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scanner Tip */}
      <div className="mx-5 bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#0f5238]/30 flex items-center justify-center flex-shrink-0">
          <span className="text-[#b1f0ce] text-base">💡</span>
        </div>
        <div>
          <p className="text-sm font-bold text-white mb-1">Scanner Tip</p>
          <p className="text-xs text-white/55 leading-relaxed">Avoid blurry photos. Hold your phone steady and 15-20cm away from the leaf for the most accurate AI diagnosis.</p>
        </div>
      </div>

      {/* Added to planner toast */}
      {addedToPlanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#0f5238] text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl z-50 animate-bounce">
          ✅ Added to Weekly Planner!
        </div>
      )}
      {/* Error toast */}
      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl z-50">
          ⚠️ {error}
        </div>
      )}

    </div>
  );
}
