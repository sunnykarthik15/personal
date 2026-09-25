import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FAF7F2] to-[#FAF7F2] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EAE2D5]">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#1B3D2B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Subtle Brand Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B3D2B]/10 border border-[#1B3D2B]/15 text-[#1B3D2B] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Authentic Indian Nutrition</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1B3D2B] leading-[1.12] tracking-tight">
              Pure Goodness, <br />
              <span className="italic font-normal text-[#785338]">Traditionally Crafted.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#5A493E] max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              Premium dry fruits, seeds, spices, cold-pressed oils, and natural-jaggery sweets, carefully selected for your everyday goodness.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1B3D2B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#2A543A] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#1B3D2B]/15"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white text-[#1B3D2B] font-semibold text-sm hover:bg-[#F3EDE2] border border-[#EAE2D5] active:scale-98 transition-all shadow-xs"
              >
                <span>Explore Our Products</span>
              </button>
            </div>

            {/* Trust Pills */}
            <div className="pt-6 border-t border-[#EAE2D5]/70 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
              <div>
                <p className="text-lg sm:text-xl font-serif font-bold text-[#1B3D2B]">40+</p>
                <p className="text-[11px] sm:text-xs text-[#785338]">Handpicked Items</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-serif font-bold text-[#1B3D2B]">100%</p>
                <p className="text-[11px] sm:text-xs text-[#785338]">Wood Ghani Pressed</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-serif font-bold text-[#1B3D2B]">Natural</p>
                <p className="text-[11px] sm:text-xs text-[#785338]">Bellam (Jaggery) Sweets</p>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Imagery Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#F4EFE6]">
                <img
                  src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=1000&q=85"
                  alt="Vaishno Karthik Premium Dry Fruits and Spices"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase">
                    Harvest Selection
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">
                    Crisp Nuts, Pure Oils & Bellam Sweets
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 mt-1">
                    Hygienically sorted and packed with care
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Quality Guarantee */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#EAE2D5] flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#1B3D2B] text-[#C5A059]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B3D2B]">No Chemical Refining</p>
                  <p className="text-[10px] text-[#785338]">Traditional wood ghani extraction</p>
                </div>
              </div>

              {/* Floating Badge 2: Local Family Trust */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#EAE2D5] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse" />
                <span className="text-xs font-bold text-[#1B3D2B]">Ready for Home Delivery</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
