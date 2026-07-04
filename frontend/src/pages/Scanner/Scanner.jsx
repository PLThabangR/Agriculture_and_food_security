import React, { useState, useEffect, useRef } from "react";
import { apiService } from "../../services/apiService";
import "./Scanner.css";

function ScanResult({ scan, onBack, onAddToPlanner, filePreviewUrl }) {
  const disease = scan?.diseaseName || "Maize Leaf Rust (Puccinia sorghi)";
  const crop = scan?.cropName || "Unknown Crop";
  const confidence = scan?.confidence || 98.0;
  const advice = scan?.advice || "Treat with triazole foliar sprays.";
  const sampleId = scan?.sampleId || "MZ-RUST-001";
  
  return (
    <div className="scanner-result-page">
      {/* Offline banner */}
      <div style={{ backgroundColor: "#111827", color: "#ffffff", textAlign: "center", fontSize: "12px", padding: "8px 0" }}>
        Offline Mode: Data cached for Free State Region
      </div>
      
      {/* Header */}
      <header className="scanner-result-header">
        <div className="scanner-header-logo-section">
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden" }}>
            <img src="https://i.pravatar.cc/40?img=11" alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span className="scanner-result-logo">AgriGrow Africa</span>
        </div>
        <button className="scanner-result-help-btn">?</button>
      </header>

      {/* Scan image with overlay */}
      <div className="scanner-preview-card" style={{ height: "220px", borderRadius: 0 }}>
        <img
          src={filePreviewUrl || scan?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Puccinia_sorghi_on_corn.jpg/640px-Puccinia_sorghi_on_corn.jpg"}
          alt="scan"
          className="scanner-preview-img"
          style={{ opacity: 0.9 }}
        />
        {/* Corner frame */}
        <div className="scanner-viewfinder-overlay">
          <div className="scanner-viewfinder-frame" style={{ width: "208px", height: "144px" }}>
            <div className="scanner-corner tl" />
            <div className="scanner-corner tr" />
            <div className="scanner-corner bl" />
            <div className="scanner-corner br" />
          </div>
        </div>
      </div>

      <div className="scanner-content-container" style={{ marginTop: "16px" }}>
        <div className="scanner-grid">
          {/* Left Column */}
          <div className="scanner-column">
            {/* Disease Name */}
            <div className="scanner-result-card">
              <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Crop: {crop}</p>
              <h2 className="scanner-result-name">{disease} Detected</h2>
              <div className="scanner-result-meta-row">
                <span className="scanner-result-badge">{confidence.toFixed(1)}% Confidence</span>
                <span className="scanner-result-meta-txt">Processed via Gemini AI</span>
              </div>
            </div>
            <p className="scanner-result-meta-txt" style={{ textAlign: "center" }}>Sample ID: {sampleId}</p>
            <button onClick={onBack} className="scanner-btn-back">
              Back to Scanner
            </button>
          </div>

          {/* Right Column */}
          <div className="scanner-column">
            {/* Remediation strategy */}
            <div>
              <p className="scanner-remediation-title">REMEDIATION STRATEGY</p>
              <div className="scanner-remediation-grid">
                <div className="scanner-remediation-card">
                  <h4 className="scanner-remediation-lbl">Scout Fields</h4>
                  <p className="scanner-remediation-desc">Check sectors B4 & C2 for infection threshold levels.</p>
                </div>
                <div className="scanner-remediation-card">
                  <h4 className="scanner-remediation-lbl">Apply Fungicide</h4>
                  <p className="scanner-remediation-desc">Use registered SA triazole foliar sprays (approx. R450/ha).</p>
                </div>
              </div>

              <div className="scanner-advice-card">
                <h4 className="scanner-advice-lbl">AI Advice</h4>
                <p className="scanner-advice-desc">{advice}</p>
              </div>
            </div>
          </div>
        </div>
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const RECENT = [
    { name: "Tomato Blight", status: "ACTION REQ", image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=150" },
    { name: "Healthy Corn", status: "STABLE", image: "https://images.unsplash.com/photo-1634467524884-897d0af5e104?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ybnxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Wheat Rust", status: "TREATED", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setError("Please select or upload a picture of the affected crop leaf first.");
      return;
    }
    setScanning(true);
    setError("");
    try {
      const result = await apiService.scanCrop(selectedFile, "Maize");
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
    return (
      <ScanResult
        scan={scanData}
        onBack={() => {
          setShowResult(false);
          setSelectedFile(null);
          setFilePreviewUrl(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }}
        onAddToPlanner={handleAddToPlanner}
        filePreviewUrl={filePreviewUrl}
      />
    );
  }

  return (
    <div className="scanner-page">
      {/* Header */}
      <header className="scanner-header">
        <div className="scanner-header-logo-section">
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden" }}>
            <img src="https://i.pravatar.cc/40?img=11" alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span className="scanner-header-logo">AgriGrow Africa</span>
        </div>
        <button className="scanner-header-help-btn">?</button>
      </header>

      <div className="scanner-content-container">
        <div className="scanner-grid">
          {/* Left Column (Camera box) */}
          <div className="scanner-column">
            {/* Instruction Banner */}
            <div className="scanner-banner">
              <p className="scanner-banner-text">Position the affected leaf clearly within the white frame. Ensure bright natural light.</p>
            </div>

            {/* Camera View */}
            <div
              className="scanner-preview-card"
              style={{ height: "340px", cursor: "pointer" }}
              onClick={triggerFileInput}
            >
              {filePreviewUrl && (
                <img
                  src={filePreviewUrl}
                  alt="camera view"
                  className="scanner-preview-img"
                  style={{ opacity: 0.8 }}
                />
              )}
              {/* Scan overlay frame */}
              <div className="scanner-viewfinder-overlay">
                <div className={`scanner-viewfinder-frame ${scanning ? "scanning" : ""}`} style={{ width: "260px", height: "200px" }}>
                  <div className="scanner-corner tl" />
                  <div className="scanner-corner tr" />
                  <div className="scanner-corner bl" />
                  <div className="scanner-corner br" />
                  {!filePreviewUrl && (
                    <div className="scanner-viewfinder-overlay" style={{ background: "transparent", borderRadius: "16px" }}>
                      <div style={{ color: "#64748b", fontWeight: "bold", fontSize: "14px", textAlign: "center", padding: "12px" }}>
                        Click to Upload / Capture Picture
                      </div>
                    </div>
                  )}
                  {scanning && (
                    <div className="scanner-viewfinder-overlay">
                      <div style={{ color: "#b1f0ce", fontWeight: "bold", fontSize: "12px" }}>Analyzing...</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status bar overlay at bottom */}
              <div className="scanner-status-bar">
                <span>Status: <span className="scanner-status-bold">{selectedFile ? "Ready to Scan" : "No File Selected"}</span></span>
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>
                  File: <span style={{ fontWeight: "bold" }}>{selectedFile ? selectedFile.name : "None"}</span>
                </span>
              </div>
            </div>

            {/* Scan Button */}
            <div className="scanner-action-btn-list" style={{ display: "flex", marginTop: "16px" }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                onClick={handleScan}
                disabled={scanning}
                className="scanner-btn scanner-btn-primary"
                style={{ width: "100%", margin: 0 }}
              >
                {scanning ? "Scanning..." : "Scan Now"}
              </button>
            </div>
          </div>

          {/* Right Column (Triggers + History + Tips) */}
          <div className="scanner-column">
            {/* Removed top action buttons */}

            {/* Recent Identifications */}
            <div className="scanner-recent-section">
              <div className="scanner-recent-header">
                <h2 className="scanner-recent-title">Recent Identifications</h2>
                <button className="scanner-recent-link">View All</button>
              </div>
              <div className="scanner-recent-list">
                {RECENT.map((r, i) => (
                  <div key={i} className="scanner-recent-card">
                    <div className="scanner-recent-img-box">
                      <img src={r.image} alt={r.name} className="scanner-recent-img" />
                    </div>
                    <div className="scanner-recent-body">
                      <p className="scanner-recent-name">{r.name}</p>
                      <span className={`scanner-recent-badge ${
                        r.status === "TREATED" ? "bg-[#0f5238] text-white" :
                        r.status === "ACTION REQ" ? "bg-red-100 text-red-600" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scanner Tip */}
            <div className="scanner-tip-card">
              <div className="scanner-tip-content">
                <p className="scanner-tip-title">Scanner Tip</p>
                <p className="scanner-tip-desc">Avoid blurry photos. Hold your phone steady and 15-20cm away from the leaf for the most accurate AI diagnosis.</p>
              </div>
            </div>
          </div> {/* Closing Right Column */}
        </div> {/* Closing Grid Container */}
      </div>

      {/* Added to planner toast */}
      {addedToPlanner && (
        <div style={{ position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#0f5238", color: "#ffffff", fontSize: "12px", fontWeight: "bold", padding: "12px 20px", borderRadius: "9999px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", zIndex: 50 }}>
          Added to Weekly Planner!
        </div>
      )}
      {/* Error toast */}
      {error && (
        <div style={{ position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#dc2626", color: "#ffffff", fontSize: "12px", fontWeight: "bold", padding: "12px 20px", borderRadius: "9999px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", zIndex: 50 }}>
          {error}
        </div>
      )}
    </div>
  );
}
