import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why does cold-pressed oil look slightly cloudy with minor sediment at the bottom?',
      a: 'This is the universal hallmark of genuine, unrefined wooden ghani (marachekku) oil! Commercial refined oils are subjected to high heat (above 200°C), acid washing, and chemical bleaching to produce unnaturally transparent liquid. Our cold-pressed oils are simply micro-filtered through fine cotton mesh. The slight natural settling at the bottom is pure seed sediment rich in natural nutrients.',
    },
    {
      q: 'How should I store dry fruits (Badam, Kaju, Walnuts) to maintain crunchiness?',
      a: 'Always store dry fruits in an airtight dry glass or stainless steel jar away from direct sunlight and humidity. In warm Indian climates, walnuts, badam, and dried figs keep their fresh oils and crunch best when refrigerated in an airtight container.',
    },
    {
      q: 'What is the shelf life of your Natural Jaggery Sweets (Sunnundalu, Laddus)?',
      a: 'Because our sweets are made purely with natural unrefined sugarcane bellam, roasted grains, and pure desi ghee—without synthetic chemical preservatives or shelf-extenders—they have an authentic fresh shelf life of 20 to 30 days when kept in a cool, moisture-free airtight container.',
    },
    {
      q: 'How does WhatsApp Ordering work?',
      a: 'You can build your cart on our website and select "Order via WhatsApp", or click our WhatsApp floating button anytime. It automatically creates a formatted text summary with your items, pack sizes, and address. Our team reviews your order, shares dispatch details, and accepts payment directly.',
    },
    {
      q: 'What are the delivery charges and delivery areas?',
      a: 'We offer FREE Home Delivery on all orders above ₹999. For smaller orders under ₹999, a flat delivery fee of ₹60 is applied. We deliver across Hyderabad, Secunderabad, and regional cities across Telangana and Andhra Pradesh.',
    },
    {
      q: 'Can I place custom pre-orders for family celebrations and weddings?',
      a: 'Yes, absolutely! We regularly prepare fresh batches of Bellam Sunnundalu, Ragi laddus, Jowar laddus, and customized festive dry fruit assortment boxes for family functions, weddings, and corporate gifting. Please call us at 9848856787 or 9642145789 at least 3-4 days in advance.',
    },
    {
      q: 'Are your spices whole or powdered?',
      a: 'We primarily supply pure whole spices (like bold Elachi, Lavangalu, Dalchina Chekka, Japathri, Jeera, Dhaniyalu). Whole spices retain their volatile essential oils and rich culinary aroma far longer than pre-ground powders, allowing you to grind them freshly in your own kitchen.',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
            Everything You Need to Know
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B3D2B]">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#5A493E] leading-relaxed">
            Clear, transparent answers about our traditional cold-pressing methods, jaggery sweets, storage, and home delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#EAE2D5] overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#1B3D2B] hover:text-[#2A543A] transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#1B3D2B] text-white' : 'text-[#785338]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-[#5A493E] leading-relaxed border-t border-[#F4EFE6] pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="bg-[#1B3D2B] text-white rounded-3xl p-8 text-center space-y-4 shadow-lg">
          <HelpCircle className="w-10 h-10 text-[#C5A059] mx-auto" />
          <h3 className="font-serif font-bold text-2xl text-white">Have a specific question not listed here?</h3>
          <p className="text-xs text-[#E8DFC8] max-w-md mx-auto">
            Our family team is happy to answer any questions about our harvest lots and cooking methods.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:9848856787"
              className="px-5 py-2.5 rounded-xl bg-[#C5A059] text-[#1B3D2B] text-xs font-semibold hover:bg-[#D4AF37] transition-colors"
            >
              Call 9848856787
            </a>
            <a
              href="https://wa.me/919848856787?text=Hello%20Vaishno%20Karthik!%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-semibold hover:bg-white/20 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
