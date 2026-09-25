import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

interface CustomerCTAProps {
  onShopClick: () => void;
  onContactClick: () => void;
}

export const CustomerCTA: React.FC<CustomerCTAProps> = ({ onShopClick, onContactClick }) => {
  return (
    <section className="py-20 bg-[#1B3D2B] text-[#FAF7F2] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
          Vaishno Karthik Promise
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF7F2] tracking-tight">
          Bring Better Ingredients Home.
        </h2>

        <p className="text-base sm:text-lg text-[#E8DFC8] max-w-2xl mx-auto leading-relaxed">
          Experience the pure difference of unadulterated cold pressed oils, crisp handpicked dry fruits, bold Indian spices, and traditional natural jaggery sweets.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C5A059] text-[#1B3D2B] font-semibold text-sm hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-xl active:scale-98"
          >
            <span>Shop Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#12281D] text-[#FAF7F2] border border-[#234E38] font-semibold text-sm hover:bg-[#1B3D2B] transition-all active:scale-98"
          >
            <span>Contact Us</span>
          </button>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#E8DFC8]">
          <a href="tel:9848856787" className="hover:text-white flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>9848856787</span>
          </a>
          <span>•</span>
          <a href="tel:9642145789" className="hover:text-white flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>9642145789</span>
          </a>
          <span>•</span>
          <span className="text-[#C5A059]">Free Delivery over ₹999</span>
        </div>
      </div>
    </section>
  );
};
