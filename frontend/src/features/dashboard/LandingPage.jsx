import React, { useContext } from "react";
import { 
  ArrowRight, 
  Scan, 
  TrendingUp, 
  CloudSun, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Globe,
  Smartphone
} from 'lucide-react';

const AgriGrowLanding = () => {
  return (
    <div className="font-sans text-slate-900 bg-[#F8F9FD]">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center px-6 lg:px-20 overflow-hidden">
        {/* Background Image Placeholder - Replace with your actual field image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="African Farm"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-3xl text-white">
          <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
            AI-Powered Precision Farming
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Empowering Africa's <br /> Smallholder Farmers
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-xl">
            Bridging traditional wisdom with AI-driven insights to maximize yields, optimize resources, and ensure continental food security.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#1B5E20] hover:bg-emerald-800 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all">
              Get Started Free <ArrowRight size={18} />
            </button>
            <button className="border border-white/50 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all">
              Explore the App
            </button>
          </div>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1590732128734-77e82846875d?auto=format&fit=crop&q=80&w=800" 
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              alt="Farmer with tablet"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#1B5E20] text-white p-8 rounded-2xl max-w-xs shadow-xl">
              <h4 className="font-bold mb-2">Our Mission</h4>
              <p className="text-sm opacity-90 leading-relaxed">
                To empower 10 million smallholder farmers across Africa with data-driven decision tools by 2030.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#0D3B2E] mb-6">
              Cultivating Food Security Through Innovation
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              AgriGrow Africa was born from a simple realization: the gap between potential and actual crop yields in Africa is largely a gap in information.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-emerald-100 p-3 rounded-full h-fit"><Globe className="text-emerald-700" /></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Localized AI Models</h4>
                  <p className="text-gray-500">Models trained on local soil data and climate patterns specific to African regions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-emerald-100 p-3 rounded-full h-fit"><Smartphone className="text-emerald-700" /></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Empowerment First</h4>
                  <p className="text-gray-500">Designed for accessibility, working even with low connectivity and local languages.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 px-6 lg:px-20 bg-[#F4F5FA]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0D3B2E] mb-4">Intelligent Farming Services</h2>
          <p className="text-gray-500">Scalable solutions tailored for the unique challenges of African agriculture.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {/* AI Scanner */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center border border-gray-100">
            <div className="flex-1">
              <div className="bg-emerald-50 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
                <Scan className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Vision AI Crop Scanner</h3>
              <p className="text-gray-500 mb-6">Instant pest and disease identification using just your smartphone camera. Get treatment advice in seconds, even offline.</p>
              <button className="text-emerald-700 font-semibold flex items-center gap-2">Learn More <ArrowRight size={16}/></button>
            </div>
            <div className="flex-1 w-full">
              <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-48 object-cover" alt="Scanner demo"/>
            </div>
          </div>

          {/* Market Insights */}
          <div className="bg-[#0D3B2E] text-white rounded-3xl p-8 shadow-lg">
            <div className="bg-white/10 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
              <TrendingUp className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Market Insights</h3>
            <p className="text-emerald-100/70 mb-10">Real-time pricing from local markets to help you sell at the right time and the best price.</p>
            <div className="bg-emerald-900/50 p-4 rounded-xl flex justify-between items-center border border-emerald-700/50">
              <span className="text-sm">Maize (Kroonstad)</span>
              <span className="text-emerald-400 font-bold">+12%</span>
            </div>
          </div>

          {/* Smart Advisory */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="bg-emerald-50 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
              <Calendar className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Advisory</h3>
            <p className="text-gray-500 mb-6 text-sm">Step-by-step guidance on planting, fertilization, and harvesting based on your micro-climate.</p>
            <button className="text-sm font-bold text-emerald-700 underline">Get Personalized Plan</button>
          </div>

          {/* Hyper Local Weather */}
          <div className="md:col-span-2 bg-[#FEE2E2] rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl font-bold text-red-900 mb-4">Hyper-Local Weather</h3>
              <p className="text-red-800/70">Predictive rainfall tracking and extreme weather alerts delivered via SMS or App notification.</p>
            </div>
            <CloudSun size={120} className="absolute -right-4 top-1/2 -translate-y-1/2 text-red-300/30 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0D3B2E] mb-2">Voices from the Field</h2>
              <p className="text-gray-500">Measuring our success by the growth of our farmers.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"><ChevronLeft size={20}/></button>
              <button className="p-3 bg-[#0D3B2E] text-white rounded-full hover:bg-emerald-900 transition-colors"><ChevronRight size={20}/></button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial Card */}
            {[
              { name: "Abebe D.", loc: "Tigray, Ethiopia", stat: "40% Yield Increase", text: "AgriGrow's pest scanner saved my entire tomato harvest this year. I identified the blight two weeks earlier than usual." },
              { name: "Grace W.", loc: "Kiambu, Kenya", stat: "2.5x Profit Growth", text: "The market insights tool changed how I negotiate. I used to sell to the first middleman, now I know the Nairobi price." },
              { name: "Thabang M.", loc: "Free State, SA", stat: "100% Crop Protection", text: "Weather is everything. The early warning system helped me protect my seedlings before the heavy rains last month." }
            ].map((t, i) => (
              <div key={i} className="p-8 bg-[#F8F9FD] rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-300" />
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-gray-400">{t.loc}</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600 mb-8 leading-relaxed">"{t.text}"</p>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <span className="text-emerald-700 font-bold text-lg">{t.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-[#2D5A43] py-20 px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to grow with precision?</h2>
        <p className="text-emerald-100/70 mb-10 max-w-2xl mx-auto">
          Join over 50,000 farmers who are already transforming their yields with AgriGrow Africa. Start your free trial today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-50 transition-all">
            Download for Android
          </button>
          <button className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
            Speak to an Agent
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pt-20 pb-10 px-6 lg:px-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-6">AgriGrow Africa</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Empowering the backbone of the continent through localized AI technology and market transparency.
            </p>
            <div className="flex gap-4">
              {/*<Facebook className="text-gray-400 cursor-pointer hover:text-emerald-600" />
              <Twitter className="text-gray-400 cursor-pointer hover:text-emerald-600" />
              <Instagram className="text-gray-400 cursor-pointer hover:text-emerald-600" />*/}
              <Mail className="text-gray-400 cursor-pointer hover:text-emerald-600" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-emerald-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-emerald-700">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-700">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-700">Contact Support</a></li>
              <li><a href="#" className="hover:text-emerald-700">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-emerald-900 mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-emerald-700">AI Diagnostic</a></li>
              <li><a href="#" className="hover:text-emerald-700">Market Ticker</a></li>
              <li><a href="#" className="hover:text-emerald-700">Soil Analysis</a></li>
              <li><a href="#" className="hover:text-emerald-700">Farm Manager</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-emerald-900 mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-gray-500 mb-6 text-sm">Stay updated on agricultural trends and new platform features.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button className="bg-[#0D3B2E] text-white p-4 rounded-xl font-bold hover:bg-emerald-900 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-10 border-t border-gray-100 text-gray-400 text-sm">
          © 2024 AgriGrow Africa. Empowering Smallholder Farmers.
        </div>
      </footer>
    </div>
  );
};

export default AgriGrowLanding;
