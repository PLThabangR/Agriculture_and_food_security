import React, { useState } from "react";
import { apiService } from "../../services/apiService";

// Import your brand new smart farming graphic asset here
import smartFarmingImg from "../../assets/iStock-2075877369-1.jpg";

export default function Login({ onLoginSuccess, onNavigate }) {
  const [email, setEmail] = useState("farmer@agrigrow.africa");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await apiService.login(email, password);
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff] flex flex-col font-sans justify-between">
      {/* Header */}
      <header className="bg-white border-b border-[#edecff] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 rounded-full bg-[#0f5238] flex items-center justify-center text-white font-bold text-xl shadow-md">
            A
          </div>
          <span className="text-xl font-bold text-[#0f5238] font-display">AgriGrow Africa</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#404943]">
          <span className="cursor-pointer hover:text-[#0f5238]" onClick={() => onNavigate('landing')}>Home</span>
          <span className="cursor-pointer hover:text-[#0f5238]">About Us</span>
          <span className="cursor-pointer hover:text-[#0f5238]">Services</span>
        </nav>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-semibold text-[#0f5238] border border-[#0f5238] rounded-full bg-[#b1f0ce]/10">
            Log In
          </button>
          <button onClick={() => onNavigate('signup')} className="px-5 py-2 text-sm font-semibold text-white bg-[#0f5238] rounded-full hover:bg-[#2d6a4f]">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl border border-[#edecff] shadow-xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
          
          {/* Left: Login Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-[#181a2e] mb-2 font-display">Welcome back</h2>
            <p className="text-sm text-[#404943] mb-8">Access your farming dashboard and AI insights.</p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-150 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#bfc9c1] bg-white text-sm text-[#181a2e] focus:outline-none focus:border-[#0f5238] focus:ring-1 focus:ring-[#0f5238] transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider">Password</label>
                  <a href="#forgot" className="text-xs font-semibold text-[#0f5238] hover:underline">Forgot Password?</a>
                </div>
                
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="" 
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[#bfc9c1] bg-white text-sm text-[#181a2e] focus:outline-none focus:border-[#0f5238] focus:ring-1 focus:ring-[#0f5238] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#404943] hover:text-[#181a2e] transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl text-white bg-[#0f5238] hover:bg-[#2d6a4f] font-bold shadow-md shadow-[#0f5238]/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Log In"} <FiLogIn size={18} />
              </button>
            </form>

            <div className="relative my-8 text-center">
              <hr className="border-[#edecff]" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-2xs font-bold text-[#404943]/60 uppercase tracking-widest">
                Or Continue With
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#bfc9c1] text-xs font-bold text-[#181a2e] bg-white hover:bg-slate-50 transition-colors">
                <span className="font-extrabold tracking-tight"></span> <span className="text-2xs text-[#404943]/60">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#bfc9c1] text-xs font-bold text-[#181a2e] bg-white hover:bg-slate-50 transition-colors">
                <span></span> <span>Partner</span>
              </button>
            </div>

            <p className="text-center text-xs text-[#404943] mt-8">
              Don't have an account?{" "}
              <button type="button" onClick={() => onNavigate('signup')} className="font-bold text-[#0f5238] hover:underline">
                Join AgriGrow Today
              </button>
            </p>
          </div>

          {/* Right: Cover Info Panel referencing iStock-2075877369-1.jpg */}
          <div className="relative hidden md:block bg-slate-100">
            <img 
              src={smartFarmingImg} 
              alt="Precision smart farming fields" 
              className="w-full h-full object-cover filter brightness-95"
            />
            {/* Elegant deep green overlay configuration matching the header aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f5238]/90 via-[#0f5238]/20 to-transparent flex flex-col justify-end p-12 text-white">
              <h3 className="text-3xl font-extrabold mb-4 leading-tight">Cultivate a Smarter Future</h3>
              <p className="text-sm text-white/85 leading-relaxed max-w-sm font-medium">
                Join over 50,000 farmers using AI-driven precision and data visualizations to maximize crop yield performance across Africa.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#edecff] py-8 text-center text-xs text-[#404943]/60">
        © {new Date().getFullYear()} AgriGrow Africa. Empowering Smallholder Farmers.
      </footer>
    </div>
  );
}