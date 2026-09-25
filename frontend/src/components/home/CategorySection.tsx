import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      title: 'Nuts & Dry Fruits',
      slug: 'nuts-dry-fruits',
      description: 'California almonds, rich cashews, succulent figs, and tender seeded raisins.',
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=700&q=80',
      itemCount: '12 Items',
    },
    {
      title: 'Seeds & Nutrition',
      slug: 'seeds-spices',
      description: 'Nutrient-rich pumpkin, chia, flax, watermelon, and cooling sabja seeds.',
      image: 'https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=700&q=80',
      itemCount: '7 Items',
    },
    {
      title: 'Whole Spices & Aromatics',
      slug: 'seeds-spices',
      description: 'Fragrant cardamom, cloves, cinnamon, mace, jeera, and authentic biryani spices.',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80',
      itemCount: '12 Items',
    },
    {
      title: 'Cold Pressed Oils',
      slug: 'cold-pressed-oils',
      description: 'Wooden ghani extracted pure groundnut (palli), sesame, and virgin coconut oils.',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80',
      itemCount: '3 Items',
    },
    {
      title: 'Natural Jaggery Sweets',
      slug: 'natural-jaggery-sweets',
      description: 'Handcrafted jowar, ragi, sunnundalu, and sesame laddus with unrefined bellam.',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80',
      itemCount: '6 Items',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3D2B] mt-1">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#785338] max-w-md mt-2 md:mt-0 leading-relaxed">
            From morning soaked badam to slow-pressed cooking oils and wholesome festive sweets, explore our complete pantry.
          </p>
        </div>

        {/* 5 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(cat.slug)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#EAE2D5] shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F4EFE6]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white">
                  {cat.itemCount}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1B3D2B] group-hover:text-[#2A543A] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#785338] line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F4EFE6] flex items-center justify-between text-xs font-semibold text-[#1B3D2B]">
                  <span>Explore Products</span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF7F2] group-hover:bg-[#1B3D2B] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
