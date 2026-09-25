import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const message = encodeURIComponent(
    'Hello Vaishno Karthik! I would like to order fresh dry fruits, cold-pressed oils, and natural jaggery sweets.'
  );

  return (
    <aside aria-label="Quick assistance" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={`https://wa.me/919848856787?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#1EBE5D] transition-all hover:scale-105 active:scale-95 border-2 border-white/40"
        aria-label="Order or Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="text-sm font-semibold tracking-wide hidden sm:inline-block">
          Order on WhatsApp
        </span>
      </a>
    </aside>
  );
};
