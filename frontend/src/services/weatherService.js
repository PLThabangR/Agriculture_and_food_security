import { Cpu, HeartHandshake } from 'lucide-react';

export default function About() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Left — image + mission card */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5956812/pexels-photo-5956812.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="African farmer with tablet in greenhouse"
              className="rounded-2xl w-full h-[440px] object-cover object-top"
            />
            {/* Floating card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-56 bg-[#1a5c38] text-white rounded-xl p-5 shadow-2xl">
              <p className="text-sm font-bold mb-2">Our Mission</p>
              <p className="text-xs text-green-100 leading-relaxed">
                To empower 10 million smallholder farmers across Africa with data-driven decision tools by 2030.
              </p>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <h2 className="text-3xl font-bold text-[#1a5c38] leading-snug mb-4">
              Cultivating Food Security Through Innovation
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-9">
              AgriGrow Africa was born from a simple realization: the gap between potential and actual crop yields in Africa is largely a gap in information.
            </p>

            <div className="space-y-7">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-[#dcfce7] rounded-full flex items-center justify-center">
                  <Cpu size={17} className="text-[#1a5c38]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Localized AI Models</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Models trained on local soil data and climate patterns specific to African regions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-[#dcfce7] rounded-full flex items-center justify-center">
                  <HeartHandshake size={17} className="text-[#1a5c38]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Empowerment First</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Designed for accessibility, working even with low connectivity and local languages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
