import React from 'react';
import { Check, ShieldCheck, HeartHandshake, Truck, Scale, Users } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: Scale,
      title: 'Carefully Selected Products',
      description: 'Every batch of dry fruits and spices is inspected for size, crunch, aroma, and moisture balance before packaging.',
    },
    {
      icon: ShieldCheck,
      title: 'Traditional Ingredients',
      description: 'Pure wood-pressed oils and natural country jaggery sweets crafted without chemical refining or preservatives.',
    },
    {
      icon: Check,
      title: 'Quality-Focused Sourcing',
      description: 'Long-term partnerships with trusted growers across Andhra Pradesh, Telangana, and renowned Indian agricultural hubs.',
    },
    {
      icon: Truck,
      title: 'Convenient Ordering',
      description: 'Order effortlessly via our modern online store, standard home delivery, or direct personal WhatsApp chat.',
    },
    {
      icon: Users,
      title: 'For Everyday Households',
      description: 'Nutritious pantry essentials priced honestly for daily family consumption rather than expensive luxury gifting alone.',
    },
    {
      icon: HeartHandshake,
      title: 'Local Business, Personal Service',
      description: 'A genuine family-led enterprise where every customer query is addressed with warmth and direct accountability.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF7F2] border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
            The Vaishno Karthik Standard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B3D2B] mt-1">
            Why Indian Families Choose Us
          </h2>
          <p className="text-sm sm:text-base text-[#5A493E] mt-3 leading-relaxed">
            In an era of mass-produced, chemically refined food items, we bring back pure goodness and traditional craftsmanship to your daily pantry.
          </p>
        </div>

        {/* 6 Grid points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#EAE2D5] shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#1B3D2B] border border-[#EAE2D5] flex items-center justify-center mb-5 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#1B3D2B]">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#785338] leading-relaxed mt-2.5">
                    {pt.description}
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
