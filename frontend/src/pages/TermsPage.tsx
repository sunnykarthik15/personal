import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#785338] hover:text-[#1B3D2B]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE2D5] shadow-premium space-y-6">
          <div className="flex items-center gap-3 text-[#1B3D2B]">
            <FileText className="w-8 h-8 text-[#C5A059]" />
            <h1 className="font-serif font-bold text-3xl sm:text-4xl">Terms & Conditions</h1>
          </div>
          <p className="text-xs text-[#785338]">Last Updated: September 2026</p>

          <div className="space-y-4 text-xs sm:text-sm text-[#5A493E] leading-relaxed">
            <p>
              Welcome to <strong>VAISHNO KARTHIK DRY FRUITS, SPICES & COLD PRESSED OILS</strong>. By accessing our website, browsing our product catalog, or placing orders via website or WhatsApp, you agree to these operational terms.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B] pt-2">1. Nature of Agricultural & Traditional Products</h3>
            <p>
              Our products are agricultural and traditional food items (such as natural almonds, cashew nuts, raw seeds, spices, wood-pressed oils, and handmade jaggery laddus). Natural variations in size, color shade, and natural oil sediment are intrinsic to unrefined food and are not product defects.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B] pt-2">2. Pricing & Orders</h3>
            <p>
              Prices listed on the website are in Indian Rupees (INR) and are inclusive of applicable taxes. In case of unexpected crop price fluctuations or market changes, catalog prices can be adjusted by the store administration. Orders placed are subject to stock availability and address verification.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B] pt-2">3. Pre-Orders & Custom Batches</h3>
            <p>
              Custom orders for family functions, weddings, and large quantities of Sunnundalu or cold-pressed oils require prior confirmation and dispatch scheduling.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-[#785338] italic">
              Placeholder Note: These terms outline general business guidelines. Formal company terms of service may be customized by the business owner.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
