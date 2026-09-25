import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1B3D2B] text-[#FAF7F2] rounded-2xl shadow-2xl border border-[#C5A059]/40 max-w-md">
        <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
        <span className="text-xs sm:text-sm font-medium pr-2">{toastMessage}</span>
        <button
          onClick={() => {
            clearToast();
            setIsCartOpen(true);
          }}
          className="text-xs font-bold text-[#C5A059] hover:underline whitespace-nowrap pl-1"
        >
          View Cart
        </button>
        <button
          onClick={clearToast}
          className="p-1 hover:bg-[#2A543A] rounded-lg transition-colors text-white/70"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
