import React from 'react';
import { Heart, Sparkles, Phone } from 'lucide-react';

interface StorySectionProps {
  onLearnMore: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onLearnMore }) => {
  return (
    <section className="py-24 bg-white border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image composition */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2] aspect-4/5 bg-[#F4EFE6]">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                alt="Traditional Indian Spices and Dry Fruits Selection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12281D]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs text-[#C5A059] uppercase tracking-wider font-semibold">Our Commitment</p>
                <p className="font-serif text-lg font-bold">From our family's pantry to your family's home.</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B3D2B]/10 text-[#1B3D2B] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Authentic Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B3D2B] leading-tight">
              About Vaishno Karthik
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5A493E] leading-relaxed">
              <p>
                <strong>VAISHNO KARTHIK DRY FRUITS, SPICES & COLD PRESSED OILS</strong> was born out of a genuine desire to offer pure, nutrient-rich essentials without unnecessary factory processing or chemical manipulation.
              </p>
              <p>
                In our kitchen and retail tradition, dry fruits aren't just snacks—they are morning nourishment for growing children, brain fuel for hardworking adults, and heartfelt tokens of respect during festivals. Our cold-pressed oils preserve the rustic sweetness of wood ghani extraction, and our laddus are bound exclusively with unrefined country bellam and desi ghee.
              </p>
              <p className="text-xs italic text-[#785338] bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE2D5]">
                Note for business owners: This space is pre-configured for your personalized founder journey, physical store address, and origin milestone story whenever you are ready to update it.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={onLearnMore}
                className="px-6 py-3.5 rounded-2xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] transition-colors shadow-md"
              >
                Read Our Story & Process
              </button>
              <a
                href="tel:9848856787"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#FAF7F2] text-[#1B3D2B] border border-[#EAE2D5] text-xs font-semibold hover:bg-[#F3EDE2] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call Store: 9848856787</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
