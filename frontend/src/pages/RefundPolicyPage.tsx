import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface RefundPolicyPageProps {
  onBack: () => void;
}

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({ onBack }) => {
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
            <RotateCcw className="w-8 h-8 text-[#C5A059]" />
            <h1 className="font-serif font-bold text-3xl sm:text-4xl">Refund & Replacement Policy</h1>
          </div>
          <p className="text-xs text-[#785338]">Last Updated: September 2026</p>

          <div className="space-y-4 text-xs sm:text-sm text-[#5A493E] leading-relaxed">
            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">1. Perishable & Food Products Notice</h3>
            <p>
              Due to food safety hygiene standards, dry fruits, edible seeds, sweets, and oils once opened cannot be returned for arbitrary reasons.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">2. Transit Damage & Replacement</h3>
            <p>
              If your package arrives physically damaged in transit or broken during courier handling, please notify us within 24 hours of delivery by sending a photo to our WhatsApp at <strong>9848856787</strong>. We will arrange a free immediate replacement or full refund.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">3. Cancellation of Orders</h3>
            <p>
              Orders can be cancelled free of charge before they are handed over to the courier partner. Once an order is out for delivery, dispatch charges cannot be refunded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
