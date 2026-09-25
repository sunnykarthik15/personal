import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bulk Order Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Vaishno Karthik!\nMy name is ${name || 'Customer'}.\nI want to inquire about: ${subject}.\nMessage: ${message || 'Please send catalog details.'}`
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
            Customer Support & Inquiries
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1B3D2B]">
            Contact Vaishno Karthik
          </h1>
          <p className="text-sm sm:text-base text-[#5A493E] leading-relaxed">
            We are always here to assist you with product details, fresh batch availability, customized festive hampers, or home delivery status.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Phone Numbers from poster */}
          <div className="bg-white p-8 rounded-3xl border border-[#EAE2D5] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#1B3D2B] flex items-center justify-center mx-auto border border-[#EAE2D5]">
              <Phone className="w-6 h-6 text-[#1B3D2B]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">Direct Phone Calling</h3>
            <p className="text-xs text-[#785338]">Tap to call our store coordinators:</p>
            <div className="pt-2 space-y-2">
              <a
                href="tel:9848856787"
                className="block text-sm font-bold text-[#1B3D2B] hover:text-[#2A543A] hover:underline"
              >
                +91 9848856787 (Primary)
              </a>
              <a
                href="tel:9642145789"
                className="block text-sm font-bold text-[#1B3D2B] hover:text-[#2A543A] hover:underline"
              >
                +91 9642145789 (Support)
              </a>
            </div>
          </div>

          {/* WhatsApp Chat */}
          <div className="bg-white p-8 rounded-3xl border border-[#EAE2D5] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto border border-[#25D366]/30">
              <MessageCircle className="w-6 h-6 fill-[#25D366] text-transparent" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">WhatsApp Orders</h3>
            <p className="text-xs text-[#785338]">Send your shopping list or inquiry via WhatsApp:</p>
            <div className="pt-2">
              <a
                href="https://wa.me/919848856787?text=Hello%20Vaishno%20Karthik!%20I%20would%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Business Hours & Region */}
          <div className="bg-white p-8 rounded-3xl border border-[#EAE2D5] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#1B3D2B] flex items-center justify-center mx-auto border border-[#EAE2D5]">
              <Clock className="w-6 h-6 text-[#1B3D2B]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">Store & Service Hours</h3>
            <p className="text-xs text-[#785338]">Monday to Sunday</p>
            <p className="text-sm font-bold text-[#1B3D2B]">8:00 AM – 9:00 PM IST</p>
            <p className="text-[11px] text-[#A89F91]">Delivering across Telangana & Andhra Pradesh</p>
          </div>

        </div>

        {/* Message Form & Map/Region Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#EAE2D5] shadow-premium">
            <h3 className="font-serif font-bold text-2xl text-[#1B3D2B] mb-2">
              Send an Inquiry or Pre-Order Request
            </h3>
            <p className="text-xs text-[#785338] mb-6">
              Fill in your requirement below and we will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#1B3D2B] mx-auto" />
                <h4 className="font-serif font-bold text-xl text-[#1B3D2B]">Inquiry Received!</h4>
                <p className="text-xs text-[#785338] max-w-md mx-auto">
                  Thank you, {name}! We have received your message. You can also directly forward it via WhatsApp below for faster response.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/919848856787?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold shadow-xs"
                  >
                    <span>Forward to WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3B32] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Reddy"
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3B32] mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9848856787"
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                  >
                    <option value="Bulk Order Inquiry">Bulk Dry Fruits / Spices Order</option>
                    <option value="Cold Pressed Oil Supply">Cold Pressed Oil Supply (5L / Bulk)</option>
                    <option value="Natural Jaggery Sweets Pre-order">Natural Jaggery Sweets Pre-Order</option>
                    <option value="Festive Corporate Gifting">Festive Corporate Gifting</option>
                    <option value="General Inquiry">General Store Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">Your Message or Required Items *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify the items, quantities, or occasion dates..."
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#1B3D2B] text-white font-semibold text-sm hover:bg-[#2A543A] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Vaishno Karthik</span>
                </button>
              </form>
            )}
          </div>

          {/* Service Reach & Gifting Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#EAE2D5] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#1B3D2B]">
                Delivery & Service Locations
              </h3>
              <p className="text-xs text-[#785338] leading-relaxed">
                We provide fast, reliable door delivery across Hyderabad, Secunderabad, and regional cities across Telangana and Andhra Pradesh.
              </p>
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-[#1B3D2B] font-medium space-y-1">
                <p>✓ Free delivery on all cart orders above ₹999</p>
                <p>✓ Packaging in food-grade, moisture-barrier packs</p>
                <p>✓ Same-day / next-day dispatch on stock items</p>
              </div>
            </div>

            <div className="bg-[#1B3D2B] text-white rounded-3xl p-8 shadow-md space-y-3">
              <h3 className="font-serif font-bold text-xl text-white">Festive Pre-Orders</h3>
              <p className="text-xs text-[#E8DFC8] leading-relaxed">
                Planning for Diwali, Sankranti, Ugadi, or family weddings? Contact us at least 3 days in advance to reserve fresh batches of Bellam Sunnundalu, Ragi laddus, and premium dry fruit gift boxes.
              </p>
              <a
                href="tel:9848856787"
                className="inline-block mt-2 text-xs font-bold text-[#C5A059] underline hover:text-white"
              >
                Call 9848856787 to discuss bulk quantities →
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
