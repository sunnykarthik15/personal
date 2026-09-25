import React, { useEffect, useState } from 'react';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Droplets, Heart } from 'lucide-react';
import { Category } from '../types';
import { api } from '../services/api';

interface CategoriesPageProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categoryDeepDives = [
    {
      slug: 'nuts-dry-fruits',
      title: 'Nuts & Dry Fruits',
      teluguSubtitle: 'ఎండిన పండ్లు & గింజలు',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Crisp California Badam (Almonds) for daily soaking',
        'Buttery whole Kaju (Cashews) W240 grade',
        'Sun-dried Afghan Anjeer (Garland Figs)',
        'Golden Kismis, White Munakka & Black Munakka',
        'Kimia Soft Mazafati Dates & Kharik Dry Dates',
      ],
      description: 'Selected from the freshest annual crops. We inspect every batch for crunch, natural oil content, and uniform size without chemical bleaching or artificial glazing.',
    },
    {
      slug: 'seeds-spices',
      title: 'Seeds & Whole Spices',
      teluguSubtitle: 'మసాలా దినుసులు & గింజలు',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Raw nutrient seeds: Pumpkin, Sunflower, Chia, Sabja & Flax',
        'Aromatic bold Elachi (8mm green cardamom pods)',
        'Hand-picked whole Lavangalu (Cloves) & Dalchina Chekka',
        'Royal spices: Japathri (Mace), Marati Mogga, Anasapuvvu, Shadjeera',
        'Foundational Telugu tadka: Nuvvulu, Dhaniyalu, Jeera, Aavalu, Menthulu',
      ],
      description: 'Essential spices that define the warm soul of Indian gravies, rasams, sambars, and Hyderabadi biryanis. Packed whole to keep natural volatile oils sealed until ground.',
    },
    {
      slug: 'cold-pressed-oils',
      title: 'Cold Pressed Oils (Wood Ghani)',
      teluguSubtitle: 'గానుగ నూనెలు',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Palli Cold Pressed Oil (Pure Groundnut Oil) with roasted nutty fragrance',
        'Sesame Cold Pressed Oil (Nuvvula Nune) pressed with touch of country bellam',
        'Virgin Wood-Pressed Coconut Oil (Kobbari Nune) from copra',
        'Extracted below 45°C without industrial friction heat',
        'Zero chemical hexanes, zero mineral blending, zero synthetic bleaching',
      ],
      description: 'Traditional Marachekku wooden ghani extraction ensures natural nutrients, antioxidants, and authentic rustic flavors remain intact for your family meals.',
    },
    {
      slug: 'natural-jaggery-sweets',
      title: 'Natural Jaggery Sweets',
      teluguSubtitle: 'బెల్లం మిఠాయిలు & లడ్డూలు',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Authentic Andhra Sunnundalu made with roasted urad dal & desi cow ghee',
        'Nutrient-dense Jowar Laddu & Ragi Laddu made with millets',
        'Classic Nuvvula Laddu (Sesame & Bellam Undalu)',
        'Roasted Flax Seed Laddu (Avise Ginjala Laddu)',
        '100% Free from refined white table sugar, glucose syrup, or artificial color',
      ],
      description: 'Made in small, hygienic home-style batches using unrefined sugarcane bellam and rich desi ghee. Prepared with traditional Telangana and Andhra recipes.',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
            Product Deep Dive
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B3D2B]">
            Our Traditional Categories
          </h1>
          <p className="text-sm sm:text-base text-[#5A493E] leading-relaxed">
            Every category at Vaishno Karthik reflects a commitment to pure sourcing, wholesome preparation, and uncompromised food honesty.
          </p>
        </div>

        {/* Category Detailed Rows */}
        <div className="space-y-16">
          {categoryDeepDives.map((cat, idx) => {
            const Icon = cat.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={cat.slug}
                className="bg-white rounded-3xl border border-[#EAE2D5] overflow-hidden shadow-premium p-6 sm:p-10 lg:p-12"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center`}>
                  
                  {/* Imagery */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-16/11 rounded-3xl overflow-hidden shadow-lg border border-[#EAE2D5] bg-[#F4EFE6]">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover hover:scale-104 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <span className="text-xs text-[#C5A059] font-semibold">{cat.teluguSubtitle}</span>
                        <h3 className="font-serif text-2xl font-bold">{cat.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Information & Highlights */}
                  <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-[#1B3D2B] flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>

                    <div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B3D2B]">
                        {cat.title}
                      </h2>
                      <p className="text-xs text-[#785338] italic mt-0.5">{cat.teluguSubtitle}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5A493E] leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-bold text-[#1B3D2B] uppercase tracking-wider">
                        Key Sourcing Highlights:
                      </p>
                      <ul className="space-y-1.5 text-xs text-[#785338]">
                        {cat.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B3D2B]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => onSelectCategory(cat.slug)}
                        className="px-6 py-3.5 rounded-2xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] transition-all flex items-center gap-2 shadow-md"
                      >
                        <span>Explore All {cat.title}</span>
                        <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
