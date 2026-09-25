import React from 'react';
import { ShieldCheck, Heart, Sparkles, Phone, Award, Users, MapPin } from 'lucide-react';

interface AboutPageProps {
  onNavigateToShop: () => void;
  onNavigateToContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToShop, onNavigateToContact }) => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
            Our Purpose & Tradition
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1B3D2B]">
            About Vaishno Karthik
          </h1>
          <p className="text-base text-[#5A493E] max-w-2xl mx-auto leading-relaxed">
            VAISHNO KARTHIK DRY FRUITS, SPICES & COLD PRESSED OILS brings back unadulterated food traditions to modern Indian homes.
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE2D5] shadow-premium space-y-6">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1B3D2B]">
            Rooted in Everyday Goodness
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#5A493E] leading-relaxed">
            <p>
              In our households, nutrition was never about synthetic supplements or heavily packaged processed snacks. It was found in a small handful of crisp soaked almonds before school, in a warm cup of milk steeped with dried dates, in dishes tempered with cold-pressed oil, and in sweet sunnundalu made with freshly roasted minapappu (urad dal), natural bellam, and melted cow ghee.
            </p>
            <p>
              As modern food shelves filled with chemically refined oils, artificially polished nuts, and sweets laden with refined white sugar, we created <strong>Vaishno Karthik</strong> to protect and celebrate what is pure, natural, and honest.
            </p>
            <p>
              We source directly from trusted farmers and traditional processors who take pride in doing things the patient, authentic way.
            </p>
          </div>

          {/* Editable Founder Note Placeholder */}
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-[#785338] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#1B3D2B] text-sm">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Founder & Store Story Placeholder</span>
            </div>
            <p className="leading-relaxed">
              This digital platform is structured to represent the Vaishno Karthik business. Specific founder biography milestones, brick-and-mortar storefront photographs, and regional heritage narratives can be updated directly through the store administration system or content files without requiring structural changes.
            </p>
          </div>
        </div>

        {/* 3 Pillars of Sourcing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-[#EAE2D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B3D2B] text-[#C5A059] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">Cold Press Extraction</h3>
            <p className="text-xs text-[#785338] leading-relaxed">
              Slow wooden ghani rotary pressing at room temperature preserves vital tocopherols, natural aroma, and nutritional purity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE2D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B3D2B] text-[#C5A059] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">Natural Jaggery Sweets</h3>
            <p className="text-xs text-[#785338] leading-relaxed">
              No refined white sugar. Our laddus and sunnundalu are sweetened exclusively with country bellam, nutritious millets, and desi ghee.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE2D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B3D2B] text-[#C5A059] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">Hand-Sorted Quality</h3>
            <p className="text-xs text-[#785338] leading-relaxed">
              Whole nuts and premium spices are physically checked for size, natural crispness, and zero insect damage.
            </p>
          </div>
        </div>

        {/* Direct Connect Callout */}
        <div className="bg-[#1B3D2B] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif font-bold text-2xl text-white">Have a question or custom order?</h3>
            <p className="text-xs text-[#E8DFC8]">Speak directly with the Vaishno Karthik team.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:9848856787"
              className="px-5 py-3 rounded-xl bg-[#C5A059] text-[#1B3D2B] text-xs font-semibold hover:bg-[#D4AF37] transition-colors"
            >
              Call 9848856787
            </a>
            <button
              onClick={onNavigateToContact}
              className="px-5 py-3 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-semibold hover:bg-white/20 transition-colors"
            >
              Contact Page
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
