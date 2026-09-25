import React from 'react';
import { ArrowLeft, Truck } from 'lucide-react';

interface ShippingPolicyPageProps {
  onBack: () => void;
}

export const ShippingPolicyPage: React.FC<ShippingPolicyPageProps> = ({ onBack }) => {
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
            <Truck className="w-8 h-8 text-[#C5A059]" />
            <h1 className="font-serif font-bold text-3xl sm:text-4xl">Shipping & Delivery Policy</h1>
          </div>
          <p className="text-xs text-[#785338]">Last Updated: September 2026</p>

          <div className="space-y-4 text-xs sm:text-sm text-[#5A493E] leading-relaxed">
            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">1. Delivery Areas Covered</h3>
            <p>
              We deliver across Hyderabad, Secunderabad, and regional cities across Telangana and Andhra Pradesh.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">2. Shipping Charges & Free Delivery</h3>
            <p>
              Orders with cart value equal to or exceeding <strong>₹999</strong> qualify for <strong>FREE Home Delivery</strong>. For cart values below ₹999, a nominal delivery fee of <strong>₹60</strong> is charged.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">3. Dispatch Timelines</h3>
            <p>
              Orders received before 2:00 PM are typically dispatched on the same business day or the next morning. Normal transit takes 1 to 3 days depending on regional distance.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">4. Food-Grade Safe Packaging</h3>
            <p>
              Cold-pressed oils are sealed in leak-proof food-grade containers with secondary barrier cushioning. Dry fruits and spices are sealed in heavy moisture-barrier pouches to retain crispness and essential aroma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
