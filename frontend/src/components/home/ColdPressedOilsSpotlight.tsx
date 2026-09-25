import React from 'react';
import { ArrowRight, Droplets, CheckCircle, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';

interface ColdPressedOilsSpotlightProps {
  products: Product[];
  onProductClick: (slug: string) => void;
  onExploreOils: () => void;
}

export const ColdPressedOilsSpotlight: React.FC<ColdPressedOilsSpotlightProps> = ({
  products,
  onProductClick,
  onExploreOils,
}) => {
  const oilProducts = products.filter(
    (p) =>
      p.category?.slug === 'cold-pressed-oils' ||
      p.slug.includes('oil') ||
      p.slug.includes('palli') ||
      p.slug.includes('sesame') ||
      p.slug.includes('coconut')
  );

  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-[#EAE2D5]">
      {/* Decorative Warm Tone */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3D2B]/10 text-[#1B3D2B] text-xs font-semibold uppercase tracking-wider">
              <Droplets className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Traditional Wood Ghani (Marachekku)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B3D2B] leading-tight">
              Cold Pressed Oils, <br />
              <span className="italic font-normal text-[#785338]">Extracted the Natural Way.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5A493E] leading-relaxed">
              We extract our oils using slow wooden rotary presses at room temperatures. 
              Free from artificial heat, solvent chemical treatments, or chemical bleaching. 
              The result is authentic nutty aroma, natural clarity, and kitchen integrity.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-[#1B3D2B]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Zero Heat Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Unrefined & Unbleached</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Natural Aroma & Golden Hue</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Traditional Indian Cooking</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreOils}
                className="px-6 py-3.5 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] transition-all flex items-center gap-2 shadow-md"
              >
                <span>Explore Our Cold Pressed Oils</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-16/10">
              <img
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80"
                alt="Cold Pressed Traditional Oil Extraction"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase">Pure Sourcing</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">Wood-Pressed Groundnut, Sesame & Coconut</h3>
                <p className="text-xs text-white/80 mt-1">Available in convenient 500ml and 1 Litre bottles.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Oil Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {oilProducts.slice(0, 3).map((oil) => (
            <div
              key={oil.id}
              onClick={() => onProductClick(oil.slug)}
              className="bg-white rounded-3xl border border-[#EAE2D5] p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-5 bg-[#F4EFE6]">
                  <img
                    src={oil.image || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'}
                    alt={oil.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1B3D2B] text-white uppercase">
                    Wood Pressed
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1B3D2B] group-hover:text-[#2A543A] transition-colors">
                  {oil.name}
                </h3>
                <p className="text-xs text-[#785338] leading-relaxed mt-2 line-clamp-2">
                  {oil.short_description || oil.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F4EFE6] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#785338]">From</span>
                  <p className="text-lg font-bold text-[#1B3D2B]">₹{oil.price.toFixed(0)} <span className="text-xs font-normal text-[#785338]">/ {oil.weight}</span></p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] text-[#1B3D2B] text-xs font-semibold group-hover:bg-[#1B3D2B] group-hover:text-white transition-colors border border-[#EAE2D5]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
