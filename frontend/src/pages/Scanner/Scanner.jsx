import React, { useState, useRef } from "react";
import { apiService } from "../../services/apiService";
import "./Scanner.css";

function ScanResult({ scan, onBack, filePreviewUrl }) {
  const disease = scan?.diseaseName || "Unknown Condition";
  const crop = scan?.cropName || "Unknown Crop";
  const confidence = scan?.confidence || 0;
  const advice = scan?.advice || "Consult an agronomist for detailed advice.";
  const sampleId = scan?.sampleId || "N/A";
  const status = scan?.status || "ACTION REQ";

  const statusColor = {
    "HEALTHY": "#10b981",
    "STABLE": "#3b82f6",
    "TREATED": "#0f5238",
    "ACTION REQ": "#ef4444",
  }[status] || "#6b7280";

  return (
    <div className="scanner-result-page">
      {/* Header */}
      <header className="scanner-result-header">
        <div className="scanner-header-logo-section">
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0f5238", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>A</div>
          <span className="scanner-result-logo">AgriGrow Africa</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>Sample ID: <strong style={{ color: "#111827" }}>{sampleId}</strong></span>
          <button className="scanner-result-help-btn">?</button>
        </div>
      </header>

      <div className="scanner-content-container">
        <div className="scanner-grid">
          {/* Left — Image + Result */}
          <div className="scanner-column">
            {/* Scanned Image */}
            <div className="scanner-preview-card" style={{ height: 260, cursor: "default", border: "none" }}>
              <img
                src={filePreviewUrl || scan?.imageUrl || "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80"}
                alt="Scanned crop"
                className="scanner-preview-img"
              />
              <div className="scanner-viewfinder-overlay">
                <div className="scanner-viewfinder-frame" style={{ width: 200, height: 140 }}>
                  <div className="scanner-corner tl" />
                  <div className="scanner-corner tr" />
                  <div className="scanner-corner bl" />
                  <div className="scanner-corner br" />
                </div>
              </div>
              <div className="scanner-status-bar">
                <span>AI Analysis Complete</span>
                <span style={{ color: "#b1f0ce", fontWeight: 700 }}>Gemini 2.5</span>
              </div>
            </div>

            {/* Disease result card */}
            <div className="scanner-result-card">
              <p style={{ margin: "0 0 4px", fontSize: 13, color: "#64748b", fontWeight: 600 }}>
                Crop Identified: <strong style={{ color: "#0f5238" }}>{crop}</strong>
              </p>
              <h2 className="scanner-result-name">{disease}</h2>
              <div className="scanner-result-meta-row">
                <span className="scanner-result-badge">{confidence.toFixed(1)}% Confidence</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: statusColor, background: statusColor + "15", padding: "3px 10px", borderRadius: 9999 }}>
                  ● {status}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8, marginBottom: 0 }}>Processed via Gemini 2.5 Flash Vision AI</p>
            </div>

            <button onClick={onBack} className="scanner-btn-back">
              ← Back to Scanner
            </button>
          </div>

          {/* Right — Remediation + Advice */}
          <div className="scanner-column">
            <p className="scanner-remediation-title">Remediation Strategy</p>
            <div className="scanner-remediation-grid">
              <div className="scanner-remediation-card">
                <h4 className="scanner-remediation-lbl">Scout Fields</h4>
                <p className="scanner-remediation-desc">Check all sectors for infection spread before applying treatment.</p>
              </div>
              <div className="scanner-remediation-card">
                <h4 className="scanner-remediation-lbl">Apply Treatment</h4>
                <p className="scanner-remediation-desc">Use registered fungicide or pesticide appropriate for detected condition.</p>
              </div>
              <div className="scanner-remediation-card">
                <h4 className="scanner-remediation-lbl">Monitor Moisture</h4>
                <p className="scanner-remediation-desc">Avoid overwatering — excess moisture promotes fungal spread.</p>
              </div>
              <div className="scanner-remediation-card">
                <h4 className="scanner-remediation-lbl">Record Scan</h4>
                <p className="scanner-remediation-desc">Log this result in your field records for seasonal tracking.</p>
              </div>
            </div>

            <div className="scanner-advice-card">
              <h4 className="scanner-advice-lbl">AI Advice</h4>
              <p className="scanner-advice-desc">{advice}</p>
            </div>

            <div className="scanner-tip-card">
              <div className="scanner-tip-content">
                <p className="scanner-tip-title">Next Steps</p>
                <p className="scanner-tip-desc">Rescan weekly to monitor treatment progress. Early intervention reduces crop loss by up to 70%.</p>
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
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const RECENT = [
    { name: "Tomato Blight", status: "ACTION REQ", statusColor: "#ef4444", bg: "#fef2f2", image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=300" },
    { name: "Healthy Corn", status: "STABLE", statusColor: "#3b82f6", bg: "#eff6ff", image: "https://images.unsplash.com/photo-1634467524884-897d0af5e104?w=300" },
    { name: "Wheat Rust", status: "TREATED", statusColor: "#0f5238", bg: "#f0faf5", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setError("Please upload a photo of the affected crop leaf first.");
      return;
    }
    setScanning(true);
    setError("");
    try {
      const result = await apiService.scanCrop(selectedFile, "Maize");
      setScanData(result);
      setShowResult(true);
    } catch (e) {
      setError(e.message || "Scan failed. Please try again.");
    } finally {
      setScanning(false);
    }
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
        filePreviewUrl={filePreviewUrl}
      />
    );
  }

  return (
    <div className="scanner-page">
      {/* Header */}
      <header className="scanner-header">
        <div className="scanner-header-logo-section">
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0f5238", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>A</div>
          <span className="scanner-header-logo">AgriGrow Africa</span>
        </div>
      </header>

      <div className="scanner-content-container">
        <div className="scanner-grid">
          {/* ── Left Column: Camera + Upload ── */}
          <div className="scanner-column">
            {/* Instruction Banner */}
            <div className="scanner-banner">
              <p className="scanner-banner-text">
                Upload a clear photo of the affected crop leaf. Ensure good lighting and keep the leaf in focus for the most accurate AI diagnosis.
              </p>
            </div>

            {/* Preview Box */}
            <div
              className="scanner-preview-card"
              style={{ height: 340, cursor: "pointer" }}
              onClick={() => fileInputRef.current?.click()}
            >
              {filePreviewUrl ? (
                <img src={filePreviewUrl} alt="Selected crop" className="scanner-preview-img" />
              ) : (
                <div className="scanner-upload-placeholder">
                  <span className="scanner-upload-label">Click to Upload Crop Photo</span>
                  <span className="scanner-upload-sub">JPG, PNG or HEIC supported</span>
                </div>
              )}

              {/* Viewfinder */}
              <div className="scanner-viewfinder-overlay">
                <div className={`scanner-viewfinder-frame ${scanning ? "scanning" : ""}`} style={{ width: 260, height: 200 }}>
                  <div className="scanner-corner tl" />
                  <div className="scanner-corner tr" />
                  <div className="scanner-corner bl" />
                  <div className="scanner-corner br" />
                </div>
              </div>

              {/* Scanning spinner */}
              {scanning && (
                <div className="scanner-scanning-overlay">
                  <div className="scanner-scanning-pulse" />
                  <span className="scanner-scanning-text">Analyzing with Gemini AI...</span>
                </div>
              )}

              {/* Status bar */}
              <div className="scanner-status-bar">
                <span>Status: <span className="scanner-status-bold">{selectedFile ? "Ready to Scan" : "Awaiting Upload"}</span></span>
                {selectedFile && <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600 }}>📁 {selectedFile.name}</span>}
              </div>
            </div>

            {/* Action buttons */}
            <div className="scanner-action-row">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button className="scanner-btn-upload" onClick={() => fileInputRef.current?.click()}>
                Upload
              </button>
              <button
                onClick={handleScan}
                disabled={scanning || !selectedFile}
                className="scanner-btn scanner-btn-primary"
              >
                {scanning ? "Scanning..." : "Scan Now"}
              </button>
            </div>
          </div>

          {/* ── Right Column: History + Tip ── */}
          <div className="scanner-column">
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
                      <span className="scanner-recent-badge" style={{ background: r.bg, color: r.statusColor }}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="scanner-result-card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>How It Works</p>
              {[
                { num: "1", step: "Upload Photo", desc: "Take or upload a clear photo of your crop leaf" },
                { num: "2", step: "AI Analysis", desc: "Gemini 2.5 Flash identifies the crop and disease" },
                { num: "3", step: "Get Advice", desc: "Receive tailored remediation and treatment advice" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 2 ? 12 : 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0f5238", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{s.num}</div>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#111827" }}>{s.step}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#6b7280", lineHeight: 1.4 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip Card */}
            <div className="scanner-tip-card">
              <span className="scanner-tip-icon">💡</span>
              <div className="scanner-tip-content">
                <p className="scanner-tip-title">Scanning Tip</p>
                <p className="scanner-tip-desc">Hold your phone 15–20cm from the leaf in bright natural light. Avoid shadows and blurry images for the most accurate diagnosis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error toast */}
      {error && (
        <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: "#dc2626", color: "#fff", fontSize: 13, fontWeight: 700, padding: "12px 24px", borderRadius: 9999, boxShadow: "0 8px 24px rgba(220,38,38,0.3)", zIndex: 50, whiteSpace: "nowrap" }}>
          {error}
        </div>
      )}
    </div>
  );
}
