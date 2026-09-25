import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Product } from '../../types';

interface NaturalJaggerySweetsSpotlightProps {
  products: Product[];
  onProductClick: (slug: string) => void;
  onExploreSweets: () => void;
}

export const NaturalJaggerySweetsSpotlight: React.FC<NaturalJaggerySweetsSpotlightProps> = ({
  products,
  onProductClick,
  onExploreSweets,
}) => {
  const sweetProducts = products.filter(
    (p) =>
      p.category?.slug === 'natural-jaggery-sweets' ||
      p.slug.includes('laddu') ||
      p.slug.includes('sunnundalu')
  );

  return (
    <section className="py-24 bg-white border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 text-[#1B3D2B] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Zero Refined Sugar • 100% Country Bellam</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B3D2B]">
            Sweets Made with Natural Jaggery
          </h2>
          <p className="text-sm sm:text-base text-[#5A493E] leading-relaxed">
            Handcrafted with slow-roasted millets, desi cow ghee, fragrant cardamom, and pure unrefined sugarcane bellam. Wholesome traditional sweets for festive joy and daily nourishment.
          </p>
        </div>

        {/* 6 Sweet Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sweetProducts.slice(0, 6).map((sweet) => (
            <div
              key={sweet.id}
              onClick={() => onProductClick(sweet.slug)}
              className="group bg-[#FAF7F2] rounded-3xl border border-[#EAE2D5] overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#F4EFE6]">
                  <img
                    src={sweet.image || 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80'}
                    alt={sweet.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1B3D2B]/90 text-white backdrop-blur-xs">
                    Pure Ghee & Bellam
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif font-bold text-xl text-[#1B3D2B] group-hover:text-[#2A543A] transition-colors">
                    {sweet.name}
                  </h3>
                  <p className="text-xs text-[#785338] line-clamp-2 mt-1.5 leading-relaxed">
                    {sweet.short_description || sweet.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#EAE2D5]/70">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#785338]">Starting At</span>
                  <p className="text-lg font-bold text-[#1B3D2B]">₹{sweet.price.toFixed(0)} <span className="text-xs font-normal text-[#785338]">({sweet.weight})</span></p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] transition-colors"
                >
                  Order Fresh
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pre-order banner */}
        <div className="mt-14 p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE2D5] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif font-bold text-xl text-[#1B3D2B]">
              Planning a Family Function, Wedding, or Festive Celebration?
            </h4>
            <p className="text-xs sm:text-sm text-[#785338]">
              We prepare fresh batches of Sunnundalu, Ragi, and Jowar laddus on custom pre-orders.
            </p>
          </div>
          <button
            onClick={onExploreSweets}
            className="px-6 py-3 rounded-2xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] transition-colors whitespace-nowrap shadow-md"
          >
            Explore Sweets Collection
          </button>
        </div>

      </div>
    </section>
  );
};
