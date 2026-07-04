import React, { useState } from "react";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Advisory from "./pages/Advisory/Advisory";
import Scanner from "./pages/Scanner/Scanner";
import Market from "./pages/Market/Market";
import Weather from "./pages/Weather/Weather";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";

import homeIcon from "./assets/icons/home.png";
import taskIcon from "./assets/icons/task.png";
import cameraIcon from "./assets/icons/camera.png";
import priceIcon from "./assets/icons/price.png";
import weatherIcon from "./assets/icons/weather.png";

// Guest user object shown when the user clicks "Explore the App"
const GUEST_USER = {
  firstName: "Guest",
  lastName: "User",
  email: "guest@agrigrow.africa",
  role: "guest",
  profileImage: "https://i.pravatar.cc/80?img=5",
};

export default function App() {
  // currentView: "landing" | "login" | "signup" | "app"
  const [currentView, setCurrentView] = useState("landing");
  // activeTab: "home" | "advisory" | "scanner" | "market" | "weather"
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState(null);

  // Called after successful login (from Login page)
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentView("app");
    setActiveTab("home");
  };

  /**
   * Universal navigation handler used by all pages.
   *   "landing"   → Landing page
   *   "login"     → Login page
   *   "signup"    → Sign Up page
   *   "guest"     → Dashboard as guest (no login required)
   *   "dashboard" → Dashboard (called from SignUp with user param)
   */
  const handleNavigate = (view, registeredUser = null) => {
    if (view === "guest") {
      setUser(GUEST_USER);
      setCurrentView("app");
      setActiveTab("home");
    } else if (view === "dashboard") {
      // After registration, registeredUser is the newly created user
      if (registeredUser) setUser(registeredUser);
      setCurrentView("app");
      setActiveTab("home");
    } else {
      setCurrentView(view);
    }
  };

  // ── Route: Landing ──────────────────────────────────────────────────────────
  if (currentView === "landing") {
    return <Landing onNavigate={handleNavigate} />;
  }

  // ── Route: Login ────────────────────────────────────────────────────────────
  if (currentView === "login") {
    return <Login onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
  }

  // ── Route: Sign Up ──────────────────────────────────────────────────────────
  if (currentView === "signup") {
    return <SignUp onNavigate={handleNavigate} />;
  }

  // ── Route: Main App (tabs) ──────────────────────────────────────────────────
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home user={user} onTabChange={setActiveTab} />;
      case "advisory":
        return <Advisory user={user} />;
      case "scanner":
        return <Scanner user={user} />;
      case "market":
        return <Market user={user} />;
      case "weather":
        return <Weather user={user} />;
      default:
        return <Home user={user} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff] flex flex-col md:flex-row">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#edecff] p-6 justify-between shrink-0 sticky top-0 h-screen z-40">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0f5238] flex items-center justify-center text-white font-bold text-xl shadow-md">
              A
            </div>
            <span className="font-extrabold text-[#0f5238] text-lg font-display">AgriGrow Africa</span>
          </div>
          
          <nav className="flex flex-col gap-2">
            {[
              { id: "home", label: "Home Dashboard", icon: homeIcon },
              { id: "advisory", label: "AI Advisories", icon: taskIcon },
              { id: "scanner", label: "Crop Scanner", icon: cameraIcon },
              { id: "market", label: "SAFEX Market", icon: priceIcon },
              { id: "weather", label: "Daily Weather", icon: weatherIcon },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    isActive 
                      ? "bg-[#0f5238] text-white shadow-md shadow-[#0f5238]/10" 
                      : "text-[#404943] hover:bg-slate-50"
                  }`}
                >
                  <img 
                    src={tab.icon} 
                    alt="" 
                    style={{ 
                      width: "20px", 
                      height: "20px", 
                      objectFit: "contain",
                      filter: isActive ? "brightness(0) invert(1)" : "none" 
                    }} 
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#edecff] pt-4">
          <div className="flex items-center gap-3">
            <img src={user?.profileImage || "https://i.pravatar.cc/80?img=5"} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="font-bold text-xs text-gray-800">{user?.firstName || "Farmer"} {user?.lastName || ""}</span>
              <span className="text-3xs text-gray-400 capitalize">{user?.role || "User"}</span>
            </div>
          </div>
          <button onClick={() => handleNavigate("landing")} className="text-left text-xs font-semibold text-red-600 hover:underline">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen pb-24 md:pb-8">
        {renderTabContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}