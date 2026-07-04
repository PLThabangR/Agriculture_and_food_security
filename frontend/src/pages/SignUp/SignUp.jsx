import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { LuSprout } from "react-icons/lu";
import { VscOrganization } from "react-icons/vsc";
import { apiService } from "../../services/apiService";

// Reference to your saved local asset file
import cropsBanner from "../../assets/shutterstock_1726609156_s-1.jpg"; 

export default function SignUp({ onNavigate }) {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("farmer");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await apiService.register(form.name, form.email, form.password, role);
      if (onNavigate) onNavigate("login");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      
      {/* Left Panel: High-Yield Agriculture Banner & Statement */}
      <div className="w-full md:w-1/2 bg-[#0f5238] flex flex-col justify-between p-8 md:p-16 relative overflow-hidden">
        
        {/* Top Image Grid Component using shutterstock_1726609156_s-1.jpg */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white flex items-end justify-center overflow-hidden">
          <div className="w-full h-full relative">
            <img 
              src={cropsBanner} 
              alt="Automated precision agricultural machinery in vast green crop fields" 
              className="w-full h-full object-cover object-center"
            />
            {/* Smooth transition overlay blending into the deep green branding */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f5238] to-transparent"></div>
          </div>
        </div>

        {/* Bottom Core Brand Context Overlay */}
        <div className="mt-auto relative z-10 pt-[55vh] md:pt-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 max-w-md">
            Empowering the roots of Africa's agriculture.
          </h2>
          <p className="text-xs text-white/75 leading-relaxed max-w-sm">
            Join over 10,000 farmers and partners using data-driven insights to transform traditional farming into precise, high-yield enterprises.
          </p>
        </div>
      </div>

      {/* Right Panel: Clean Interactive Form Container */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:px-20 bg-white">
        <div className="max-w-md w-full mx-auto">
          
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#181a2e] mb-1.5 tracking-tight">Create Account</h1>
          <p className="text-xs font-medium text-[#707973] mb-6">Start your journey toward sustainable yield growth and market access today.</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs font-semibold text-red-600 transition-all">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#181a2e] mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bfc9c1]">
                  <FiUser size={16} />
                </span>
                <input 
                  type="text" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  placeholder=""
                  required
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#bfc9c1]/60 bg-white text-sm text-[#181a2e] focus:outline-none focus:border-[#0f5238] focus:ring-1 focus:ring-[#0f5238] transition-all placeholder:text-[#bfc9c1]/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#181a2e] mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bfc9c1]">
                  <FiMail size={16} />
                </span>
                <input 
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#bfc9c1]/60 bg-white text-sm text-[#181a2e] focus:outline-none focus:border-[#0f5238] focus:ring-1 focus:ring-[#0f5238] transition-all placeholder:text-[#bfc9c1]/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#181a2e] mb-1.5">Create Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bfc9c1]">
                  <FiLock size={16} />
                </span>
                <input 
                  type={showPass ? "text" : "password"} 
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-2.5 rounded-xl border border-[#bfc9c1]/60 bg-white text-sm text-[#181a2e] focus:outline-none focus:border-[#0f5238] focus:ring-1 focus:ring-[#0f5238] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bfc9c1] hover:text-[#404943] transition-colors"
                >
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#181a2e] mb-2">I am joining as a:</label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setRole("farmer")}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all min-h-[84px] ${
                    role === "farmer" 
                      ? "border-[#0f5238] bg-[#b1f0ce]/10 text-[#0f5238]" 
                      : "border-[#bfc9c1]/30 bg-white text-[#bfc9c1] hover:bg-slate-50"
                  }`}
                >
                  <LuSprout size={20} className={role === "farmer" ? "text-[#0f5238]" : "text-[#bfc9c1]"} />
                  <span className="text-xs font-bold">Farmer</span>
                </div>

                <div 
                  onClick={() => setRole("partner")}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all min-h-[84px] ${
                    role === "partner" 
                      ? "border-[#0f5238] bg-[#b1f0ce]/10 text-[#0f5238]" 
                      : "border-[#bfc9c1]/30 bg-white text-[#bfc9c1] hover:bg-slate-50"
                  }`}
                >
                  <VscOrganization size={20} className={role === "partner" ? "text-[#0f5238]" : "text-[#bfc9c1]"} />
                  <span className="text-xs font-bold">Partner</span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 rounded-xl text-white bg-[#0f5238] hover:bg-[#1b4332] font-bold text-sm transition-all disabled:opacity-50 mt-6 shadow-sm"
            >
              {loading ? "Registering Account..." : "Join the Community"}
            </button>
          </form>

          <p className="text-xs font-medium text-[#707973] text-center mt-6 leading-relaxed">
            By signing up, you agree to our{" "}
            <a href="#terms" className="text-[#0f5238] font-bold underline hover:text-[#1b4332]">Terms of Service</a>
            {" "}and{" "}
            <a href="#privacy" className="text-[#0f5238] font-bold underline hover:text-[#1b4332]">Privacy Policy</a>.
          </p>

          <div className="text-center mt-6 border-t border-[#edecff]/60 pt-4">
            <span className="text-xs text-[#707973] font-medium">Already have an account? </span>
            <button 
              type="button"
              onClick={() => onNavigate && onNavigate('login')} 
              className="text-xs font-bold text-[#0f5238] hover:underline"
            >
              Log In
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}