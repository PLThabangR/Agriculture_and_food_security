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
    <div className="min-h-screen bg-[#fbf8ff]">
      {renderTabContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}