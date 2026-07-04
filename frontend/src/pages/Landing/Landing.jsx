import React, { useState, useEffect, useRef } from "react";
import tractorIcon from "../../assets/icons/tractor-white.png";

export default function Landing({ onNavigate }) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  // Track active nav section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "about", "services", "impact"];
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const testimonials = [
    {
      name: "Abebe D.", location: "Tigray, Ethiopia",
      text: "\"AgriGrow's pest scanner saved my entire tomato harvest this year. I identified the blight two weeks earlier than usual and followed the 4-step organic treatment plan. My yield increased by 40%.\"",
      stat: "40%", statLabel: "Yield Increase",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Grace W.", location: "Kisumu, Kenya",
      text: "\"The market insights tool changed how I negotiate. I used to sell to the first middleman who arrived. Now, I know the Nairobi price and I've doubled my income by timing my sales correctly.\"",
      stat: "2.5x", statLabel: "Profit Growth",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Thabang M.", location: "Vryheid, South Africa",
      text: "\"As a cocoa farmer, weather is everything. The early warning system helped me protect my seedlings before the unusual heavy rains last month. My neighbors lost half their crop; I lost nothing.\"",
      stat: "100%", statLabel: "Crop Protection",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const prev = () => setTestimonialIdx(i => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setTestimonialIdx(i => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0f5238] flex items-center justify-center text-white shadow-md">
            <img src={tractorIcon} alt="Tractor Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-lg font-bold text-[#0f5238]">AgriGrow Africa</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {[
            { label: "Home", id: "home" },
            { label: "Impact", id: "impact" },
            { label: "Services", id: "services" },
            { label: "About", id: "about" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative pb-0.5 font-semibold transition-colors hover:text-[#0f5238] ${
                activeSection === id ? "text-[#0f5238]" : "text-gray-600"
              }`}
            >
              {label}
              {activeSection === id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f5238] rounded-full" />
              )}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('login')} className="text-sm font-semibold text-gray-700 hover:text-[#0f5238] transition-colors">Log In</button>
          <button onClick={() => onNavigate('signup')} className="px-5 py-2 text-sm font-bold text-white bg-[#0f5238] rounded-lg hover:bg-[#2d6a4f] transition-colors">Sign Up</button>
        </div>
      </header>

      {/* Hero Section - full green background with field image */}
      <section id="home" className="relative min-h-[520px] flex items-end bg-[#0f5238] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&auto=format&fit=crop&q=80"
          alt="African farmland"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
        <div className="relative z-10 px-8 md:px-16 pb-16 pt-24 max-w-3xl">
          <span className="inline-block px-3 py-1 bg-[#b1f0ce]/20 border border-[#b1f0ce]/40 text-[#b1f0ce] text-xs font-bold uppercase tracking-widest rounded mb-6">
            AI-Powered Precision Farming
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Empowering Africa's<br />
            <span className="text-[#b1f0ce]">Smallholder Farmers</span>
          </h1>
          <p className="text-sm text-white/75 leading-relaxed max-w-xl mb-10">
            Bridging traditional wisdom with AI-driven insights to maximize yields, optimize resources, and ensure continental food security.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('login')} className="px-6 py-3 bg-white text-[#0f5238] font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-lg">
              Get Started Free
            </button>
            <button onClick={() => onNavigate('guest')} className="px-6 py-3 bg-transparent border border-white/50 text-white font-bold rounded-lg text-sm hover:bg-white/10 transition-colors">
              Explore the App
            </button>
          </div>
        </div>
      </section>

      {/* Mission / Cultivating Food Security */}
      <section id="about" className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhcm18ZW58MHx8MHx8fDA%3D" alt="Farmer with tablet" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-6 right-6 bg-[#0f5238] text-white p-5 rounded-xl shadow-xl max-w-[200px]">
              <p className="text-xs font-bold mb-1">Our Mission</p>
              <p className="text-xs text-white/80 leading-relaxed">To empower 10 million smallholder farmers across Africa with data-driven decision tools by 2030.</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f5238] mb-4">Cultivating Food Security Through Innovation</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              AgriGrow Africa was born from a simple realization: the gap between potential and actual crop yields in Africa is largely a gap in information.
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0f5238] flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Localized AI Models</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Models trained on local soil data and climate patterns specific to African regions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0f5238] flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Empowerment First</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Designed for accessibility, working even with low connectivity and local languages.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 md:px-16 bg-[#f4f2ff]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-3">Intelligent Farming Services</h2>
          <p className="text-sm text-gray-500 text-center mb-12">Scalable solutions tailored for the unique challenges of African agriculture.</p>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {/* Vision AI Crop Scanner */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-[#b1f0ce]/30 rounded-xl flex items-center justify-center mb-4">
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Vision AI Crop Scanner</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">Instant pest and disease identification using just your smartphone camera. Get treatment advice in seconds, even offline.</p>
              <button onClick={() => onNavigate('login')} className="text-xs font-bold text-[#0f5238] flex items-center gap-1">Learn More</button>
            </div>

            {/* Market Insights - dark green card */}
            <div className="bg-[#0f5238] p-6 rounded-2xl shadow-sm text-white">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">Market Insights</h3>
              <p className="text-xs text-white/75 leading-relaxed mb-4">Real-time pricing from local markets to help you sell at the right time and the best price.</p>
              <div className="flex justify-between items-center text-xs bg-white/10 rounded-lg p-2 mt-2">
                <span className="text-white/70">Maize (Kroonstad)</span>
                <span className="font-bold text-[#b1f0ce]">+12%</span>
              </div>
            </div>

            {/* Smart Advisory - light bg */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Smart Advisory</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">Step-by-step guidance on planting, fertilization, and harvesting based on your micro-climate.</p>
              <button onClick={() => onNavigate('login')} className="text-xs font-bold text-[#0f5238] flex items-center gap-1">Get Personalized Plan</button>
            </div>

            {/* Hyper-Local Weather - salmon/red card */}
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              </div>
              <h3 className="font-bold text-red-900 mb-2 text-sm">Hyper-Local Weather</h3>
              <p className="text-xs text-red-700 leading-relaxed">Predictive rainfall tracking and extreme weather alerts delivered via SMS or App notification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="impact" className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Voices from the Field</h2>
              <p className="text-sm text-gray-500 mt-1">Measuring our success by the growth of our farmers.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                &lt;
              </button>
              <button onClick={next} className="w-10 h-10 rounded-full bg-[#0f5238] flex items-center justify-center text-white hover:bg-[#2d6a4f] transition-colors">
                &gt;
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`bg-white p-6 rounded-2xl border transition-all ${idx === testimonialIdx ? 'border-[#0f5238] shadow-md' : 'border-gray-100 shadow-sm'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic mb-4">{t.text}</p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-500">{t.statLabel}</span>
                  <span className="text-xl font-extrabold text-[#0f5238]">{t.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-[#0f5238] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to grow with precision?</h2>
          <p className="text-sm text-white/70 mb-10">Join over 50,000 farmers who are already transforming their yields with AgriGrow Africa. Start your free trial today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('signup')} className="px-8 py-3 bg-white text-[#0f5238] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">Download for Android</button> </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-[#0f5238] mb-3 text-sm">AgriGrow Africa</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">Empowering the backbone of the continent through localized AI technology and market transparency.</p>
            <div className="flex gap-3 text-gray-400">
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs cursor-pointer hover:bg-[#b1f0ce] hover:text-[#0f5238] transition-colors">🌐</span>
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs cursor-pointer hover:bg-[#b1f0ce] hover:text-[#0f5238] transition-colors">📡</span>
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs cursor-pointer hover:bg-[#b1f0ce] hover:text-[#0f5238] transition-colors">🌿</span>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-xs text-[#0f5238] uppercase tracking-widest mb-4">Quick Links</h5>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><a href="#" className="hover:text-[#0f5238] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#0f5238] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#0f5238] transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-[#0f5238] transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-xs text-[#0f5238] uppercase tracking-widest mb-4">Services</h5>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><a href="#" className="hover:text-[#0f5238] transition-colors">AI Diagnostic</a></li>
              <li><a href="#" className="hover:text-[#0f5238] transition-colors">Market Ticker</a></li>
              <li><a href="#" className="hover:text-[#0f5238] transition-colors">Soil Analysis</a></li>
              <li><a href="#" className="hover:text-[#0f5238] transition-colors">Farm Manager</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-xs text-[#0f5238] uppercase tracking-widest mb-4">Newsletter</h5>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">Stay updated on agricultural trends and new platform features.</p>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Email address" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#0f5238]" />
              <button className="w-full py-2 bg-[#0f5238] text-white text-xs font-bold rounded-lg hover:bg-[#2d6a4f] transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} AgriGrow Africa. Empowering Smallholder Farmers.
        </div>
      </footer>
    </div>
  );
}
