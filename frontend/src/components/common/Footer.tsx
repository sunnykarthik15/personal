import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Heart, ShieldCheck, Clock, Award } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Vaishno Karthik! I would like to inquire about your dry fruits, spices, and cold-pressed oils.'
  );

  return (
    <footer className="bg-[#12281D] text-[#FAF7F2] border-t border-[#1B3D2B]/50 pt-16 pb-12">
      {/* Upper Footer: Value Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#234E38]/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-3 rounded-2xl bg-[#1B3D2B] text-[#C5A059] border border-[#C5A059]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#FAF7F2]">100% Unadulterated</h4>
              <p className="text-xs text-[#E8DFC8]">Zero chemical refining or synthetic additives</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-3 rounded-2xl bg-[#1B3D2B] text-[#C5A059] border border-[#C5A059]/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#FAF7F2]">Traditionally Crafted</h4>
              <p className="text-xs text-[#E8DFC8]">Wood ghani pressed & handmade laddus</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-3 rounded-2xl bg-[#1B3D2B] text-[#C5A059] border border-[#C5A059]/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#FAF7F2]">Fresh Harvest Batches</h4>
              <p className="text-xs text-[#E8DFC8]">Hand-sorted dry fruits & raw seeds</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-3 rounded-2xl bg-[#1B3D2B] text-[#C5A059] border border-[#C5A059]/20">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#FAF7F2]">Family Trusted</h4>
              <p className="text-xs text-[#E8DFC8]">Carefully prepared for Indian households</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-tight text-[#FAF7F2]">
                VAISHNO KARTHIK
              </span>
              <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase mt-0.5">
                Dry Fruits, Spices & Cold Pressed Oils
              </span>
            </div>
            <p className="text-sm text-[#D3C7B5] leading-relaxed max-w-md">
              Bringing traditional Indian goodness back to your kitchen table. Premium whole dry fruits, nutrient-rich edible seeds, pure wood-pressed edible oils, and handcrafted natural-jaggery sweets.
            </p>
            
            {/* Direct Contact Callout */}
            <div className="pt-2 space-y-2">
              <p className="text-xs uppercase tracking-wider text-[#C5A059] font-semibold">
                Customer Support & Quick Pre-Orders:
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:9848856787"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1B3D2B] text-sm text-[#FAF7F2] hover:bg-[#2A543A] border border-[#234E38] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span>9848856787</span>
                </a>
                <a
                  href="tel:9642145789"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1B3D2B] text-sm text-[#FAF7F2] hover:bg-[#2A543A] border border-[#234E38] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span>9642145789</span>
                </a>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-lg text-[#FAF7F2] tracking-wide">
              Product Categories
            </h4>
            <ul className="space-y-2 text-sm text-[#D3C7B5]">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C5A059] transition-colors">
                  Nuts & Dry Fruits
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C5A059] transition-colors">
                  Seeds & Whole Spices
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C5A059] transition-colors">
                  Cold Pressed Oils (Ghani)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C5A059] transition-colors">
                  Natural Jaggery Sweets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C5A059] transition-colors">
                  Pre-Order Festive Hampers
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-lg text-[#FAF7F2] tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#D3C7B5]">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C5A059] transition-colors">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#C5A059] transition-colors">
                  Our Traditional Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#C5A059] transition-colors">
                  Contact & Store Info
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-[#C5A059] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account')} className="hover:text-[#C5A059] transition-colors">
                  My Orders & Account
                </button>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Chat */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-lg text-[#FAF7F2] tracking-wide">
              Direct WhatsApp
            </h4>
            <p className="text-xs text-[#D3C7B5] leading-relaxed">
              Prefer to order via chat? Tap below to send your shopping list directly to our team.
            </p>
            <a
              href={`https://wa.me/919848856787?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1EBE5D] transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
            <div className="pt-2 text-xs text-[#E8DFC8]/70">
              Delivery across Hyderabad, Secunderabad, Telangana & Andhra Pradesh.
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Policies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#234E38]/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89F91]">
          <p>© {new Date().getFullYear()} Vaishno Karthik Dry Fruits, Spices & Cold Pressed Oils. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="cursor-pointer hover:text-white" onClick={() => handleNav('privacy-policy')}>Privacy Policy</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-white" onClick={() => handleNav('terms')}>Terms & Conditions</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-white" onClick={() => handleNav('shipping-policy')}>Shipping Policy</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-white" onClick={() => handleNav('refund-policy')}>Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
