import React from 'react';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onNavigateToShop: () => void;
  onNavigateToCheckout: () => void;
  onSelectProduct: (slug: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateToShop,
  onNavigateToCheckout,
  onSelectProduct,
}) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    total,
  } = useCart();

  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const generateWhatsAppMessage = () => {
    let msg = `*Vaishno Karthik Store - Cart Order Inquiry*\n\n`;
    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (${item.variantLabel})\n   Qty: ${item.quantity} × ₹${item.unitPrice} = ₹${item.unitPrice * item.quantity}\n`;
    });
    msg += `\n*Subtotal:* ₹${subtotal}`;
    msg += `\n*Delivery Charges:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}`;
    msg += `\n*Total Amount:* ₹${total}`;
    msg += `\n\nPlease confirm availability and delivery!`;
    return encodeURIComponent(msg);
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-white border border-[#EAE2D5] flex items-center justify-center mx-auto text-[#1B3D2B] shadow-md">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1B3D2B]">Your shopping cart is empty</h2>
          <p className="text-sm text-[#785338] max-w-md mx-auto">
            Explore our curated range of California almonds, wooden ghani oils, whole spices, and natural jaggery sweets.
          </p>
          <button
            onClick={onNavigateToShop}
            className="px-8 py-3.5 rounded-2xl bg-[#1B3D2B] text-white text-sm font-semibold hover:bg-[#2A543A] shadow-md"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
              Shopping Cart
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3D2B] mt-1">
              Review Your Items ({items.reduce((s, i) => s + i.quantity, 0)})
            </h1>
          </div>

          <button
            onClick={onNavigateToShop}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#785338] hover:text-[#1B3D2B]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="mb-8 p-4 bg-white rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[#1B3D2B]">
              {amountNeeded > 0
                ? `Add items worth ₹${amountNeeded.toFixed(0)} more to unlock FREE Home Delivery!`
                : '🎉 You have qualified for FREE Home Delivery!'}
            </span>
            <span className="font-bold text-[#1B3D2B]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-[#EAE2D5]">
            <div
              className="bg-[#1B3D2B] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Layout: Items List + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-[#EAE2D5] shadow-xs flex flex-col sm:flex-row items-center gap-5"
              >
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=200&q=80'}
                  alt={item.name}
                  onClick={() => onSelectProduct(item.slug)}
                  className="w-24 h-24 object-cover rounded-2xl bg-[#F4EFE6] shrink-0 cursor-pointer"
                />

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h3
                    onClick={() => onSelectProduct(item.slug)}
                    className="font-serif font-bold text-lg text-[#1B3D2B] hover:text-[#2A543A] transition-colors cursor-pointer truncate"
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#785338]">Pack size: {item.variantLabel}</p>
                  <p className="text-xs text-[#A89F91] mt-0.5">₹{item.unitPrice.toFixed(0)} each</p>
                </div>

                {/* Counter */}
                <div className="flex items-center border border-[#EAE2D5] rounded-xl bg-[#FAF7F2]">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-[#1B3D2B] hover:bg-[#EAE2D5] rounded-l-xl transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#1B3D2B]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-[#1B3D2B] hover:bg-[#EAE2D5] rounded-r-xl transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Total & Trash */}
                <div className="flex items-center gap-4">
                  <span className="text-base font-bold text-[#1B3D2B] min-w-[70px] text-right">
                    ₹{(item.unitPrice * item.quantity).toFixed(0)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-red-600 hover:underline"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-premium space-y-6 sticky top-28">
              <h3 className="font-serif font-bold text-xl text-[#1B3D2B] pb-3 border-b border-[#F4EFE6]">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-[#785338]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1B3D2B]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-[#1B3D2B]">
                    {deliveryFee === 0 ? <span className="text-green-700">FREE</span> : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#F4EFE6] flex justify-between text-base font-bold text-[#1B3D2B]">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={onNavigateToCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-[#1B3D2B] text-white font-semibold text-sm hover:bg-[#2A543A] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/919848856787?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366]/15 text-[#137333] border border-[#25D366]/30 font-semibold text-xs hover:bg-[#25D366]/25 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-[#25D366] text-transparent" />
                  <span>Order via WhatsApp Chat</span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] text-[11px] text-[#785338] space-y-1">
                <p className="font-bold text-[#1B3D2B]">100% Quality Guaranteed</p>
                <p>Delivery across Hyderabad, Secunderabad, Telangana and Andhra Pradesh.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
