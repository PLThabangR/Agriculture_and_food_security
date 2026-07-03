import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { apiService } from "../../services/apiService";

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
      // Pass user into the app and navigate to dashboard
      onNavigate("dashboard", user);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Nav */}
      <header className="border-b border-gray-100 px-8 md:px-16 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-[#0f5238]">AgriGrow Africa</span>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500 font-medium">
          <button onClick={() => onNavigate("landing")} className="hover:text-[#0f5238] transition-colors">Home</button>
          <a href="#" className="hover:text-[#0f5238] transition-colors">About Us</a>
          <a href="#" className="hover:text-[#0f5238] transition-colors">Services</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("login")} className="text-sm font-semibold text-gray-700 hover:text-[#0f5238] transition-colors">Sign In</button>
          <button className="px-5 py-2 text-sm font-bold text-white bg-[#0f5238] rounded-lg">Sign Up</button>
        </div>
      </header>

      <main className="grid md:grid-cols-2 min-h-[calc(100vh-65px)]">
        {/* Left — photo collage with overlay text */}
        <div className="relative hidden md:block overflow-hidden">
          <div className="absolute inset-0 grid grid-rows-2 h-full">
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&auto=format&fit=crop&q=80" alt="farm" className="w-full h-full object-cover" />
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&auto=format&fit=crop&q=80" alt="farmer" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0f5238]/60 flex flex-col justify-end p-10">
                <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
                  Empowering the roots of Africa's agriculture.
                </h2>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  Join over 10,000 farmers and partners using AI-driven insights to transform traditional farming into precise, high-yield enterprises.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["?w=40&h=40&fit=crop&crop=face&seed=1","?w=40&h=40&fit=crop&crop=face&seed=2","?w=40&h=40&fit=crop&crop=face&seed=3"].map((s,i) => (
                      <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <span className="text-xs text-white font-semibold">Trusted by community leaders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex items-center justify-center px-8 py-12 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Create Account</h1>
            <p className="text-sm text-gray-500 mb-4">Start your journey toward sustainable yield growth and market access today.</p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-2 focus-within:border-[#0f5238] transition-colors">
                  <span className="text-gray-400">👤</span>
                  <input
                    type="text"
                    placeholder="Kwame Mensah"
                    className="flex-1 text-sm outline-none text-gray-800 bg-transparent"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-2 focus-within:border-[#0f5238] transition-colors">
                  <span className="text-gray-400">✉️</span>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="flex-1 text-sm outline-none text-gray-800 bg-transparent"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Create Password</label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-2 focus-within:border-[#0f5238] transition-colors">
                  <span className="text-gray-400">🔒</span>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="flex-1 text-sm outline-none text-gray-800 bg-transparent"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Role Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">I am joining as a:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("farmer")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === "farmer" ? "border-[#0f5238] bg-[#f0faf5]" : "border-gray-200 bg-white hover:border-gray-300"}`}
                  >
                    <span className="text-2xl">🌱</span>
                    <span className={`text-xs font-bold ${role === "farmer" ? "text-[#0f5238]" : "text-gray-700"}`}>Farmer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("partner")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === "partner" ? "border-[#0f5238] bg-[#f0faf5]" : "border-gray-200 bg-white hover:border-gray-300"}`}
                  >
                    <span className="text-2xl">🤝</span>
                    <span className={`text-xs font-bold ${role === "partner" ? "text-[#0f5238]" : "text-gray-700"}`}>Partner</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0f5238] text-white font-bold rounded-xl text-sm hover:bg-[#2d6a4f] transition-colors shadow-md mt-1 disabled:opacity-60 disabled:cursor-wait"
              >
                {loading ? "Creating account..." : "Join the Community"}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By signing up, you agree to our{" "}
                <a href="#" className="text-[#0f5238] hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-[#0f5238] hover:underline">Privacy Policy</a>.
              </p>

              <hr className="border-gray-100 my-1" />

              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <button type="button" onClick={() => onNavigate("login")} className="text-[#0f5238] font-bold hover:underline">Sign In</button>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h4 className="font-bold text-[#0f5238] mb-2 text-sm">AgriGrow Africa</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Empowering Smallholder Farmers with AI and sustainable practices.</p>
          </div>
          <div>
            <h5 className="font-semibold text-xs text-[#0f5238] uppercase tracking-widest mb-3">Platform</h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a href="#" className="hover:text-[#0f5238]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#0f5238]">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-xs text-[#0f5238] uppercase tracking-widest mb-3">Company</h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a href="#" className="hover:text-[#0f5238]">Contact Support</a></li>
              <li><a href="#" className="hover:text-[#0f5238]">Careers</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-xs text-[#0f5238] uppercase tracking-widest mb-3">Connect</h5>
            <div className="flex gap-2 text-gray-400 text-sm">
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-[#b1f0ce] hover:text-[#0f5238] transition-colors">🌐</span>
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-[#b1f0ce] hover:text-[#0f5238] transition-colors">📡</span>
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-[#b1f0ce] hover:text-[#0f5238] transition-colors">🌿</span>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400">© {new Date().getFullYear()} AgriGrow Africa. Empowering Smallholder Farmers.</p>
      </footer>
    </div>
  );
}
