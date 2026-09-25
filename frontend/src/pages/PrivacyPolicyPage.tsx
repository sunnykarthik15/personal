import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PolicyPageProps> = ({ onBack }) => {
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
            <Shield className="w-8 h-8 text-[#C5A059]" />
            <h1 className="font-serif font-bold text-3xl sm:text-4xl">Privacy Policy</h1>
          </div>
          <p className="text-xs text-[#785338]">Last Updated: September 2026</p>

          <div className="space-y-4 text-xs sm:text-sm text-[#5A493E] leading-relaxed">
            <p>
              At <strong>VAISHNO KARTHIK DRY FRUITS, SPICES & COLD PRESSED OILS</strong>, we value your trust and are committed to protecting the privacy of our customers and visitors.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B] pt-2">1. Information We Collect</h3>
            <p>
              When you browse our catalog or place an order via website or WhatsApp, we collect information necessary to fulfill your delivery:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Full name, delivery address, city, state, and postal PIN code</li>
              <li>Contact phone number for dispatch and delivery partner coordination</li>
              <li>Email address (optional, used for sending order confirmations and receipts)</li>
            </ul>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B] pt-2">2. How We Use Your Information</h3>
            <p>
              We use your contact and delivery information solely to package your products, coordinate with courier partners, provide WhatsApp updates on order tracking, and respond to your customer inquiries.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B] pt-2">3. Payment Information</h3>
            <p>
              We do not store credit card numbers, debit card PINs, or UPI credentials on our servers. Online payment integrations (such as Razorpay) process transactions via secure RBI-compliant encrypted gateways.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-[#785338] italic">
              Placeholder Note: This policy serves as the operational baseline. The business owner may update specific legal terms or data retention clauses via backend settings or by providing legal counsel documentation.
            </div>

            <h3 className="font-serif font-bold text-lg text-[#1B3D2B] pt-2">4. Contacting Us Regarding Privacy</h3>
            <p>
              If you have any questions regarding your personal details, call us at <strong>9848856787</strong> / <strong>9642145789</strong> or message us on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
