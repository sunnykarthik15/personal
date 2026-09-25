import React from 'react';
import { Sparkles, Leaf, Hammer, CalendarCheck } from 'lucide-react';

export const TrustCards: React.FC = () => {
  const cards = [
    {
      icon: Sparkles,
      title: 'Quality Products',
      description: 'Carefully sorted whole nuts, aromatic bold spices, and unadulterated cold pressed oils.',
    },
    {
      icon: Leaf,
      title: 'Naturally Sourced',
      description: 'Harvest-fresh crops sourced with integrity and packed to retain authentic crunch and aroma.',
    },
    {
      icon: Hammer,
      title: 'Traditionally Crafted',
      description: 'Slow wooden marachekku cold pressing and handcrafted Andhra natural jaggery laddus.',
    },
    {
      icon: CalendarCheck,
      title: 'Pre-Orders Welcome',
      description: 'Customized festive gifting hampers, family celebration boxes, and bulk dry fruit orders.',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EAE2D5] hover:border-[#C5A059]/60 hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAE2D5] text-[#1B3D2B] flex items-center justify-center mb-4 group-hover:bg-[#1B3D2B] group-hover:text-[#FAF7F2] transition-colors shadow-xs">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1B3D2B] group-hover:text-[#2A543A] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#785338] leading-relaxed mt-2">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
