import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateToCheckout, onNavigateToShop }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  // Generate WhatsApp order message
  const generateWhatsAppMessage = () => {
    let msg = `*Vaishno Karthik Store - New Order Inquiry*\n\n`;
    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (${item.variantLabel})\n   Qty: ${item.quantity} × ₹${item.unitPrice} = ₹${item.unitPrice * item.quantity}\n`;
    });
    msg += `\n*Subtotal:* ₹${subtotal}`;
    msg += `\n*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}`;
    msg += `\n*Estimated Total:* ₹${total}`;
    msg += `\n\nPlease confirm availability and delivery to my address.`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#EAE2D5]">
          
          {/* Drawer Header */}
          <div className="p-6 bg-white border-b border-[#EAE2D5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1B3D2B]" />
              <h3 className="font-serif font-bold text-xl text-[#1B3D2B]">Your Shopping Cart</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1B3D2B]/10 text-[#1B3D2B] font-semibold">
                {items.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-[#785338] hover:bg-[#FAF7F2] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Goal Bar */}
          <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#EAE2D5]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-[#4A3B32]">
                {amountNeededForFreeDelivery > 0
                  ? `Add ₹${amountNeededForFreeDelivery.toFixed(0)} more for FREE Delivery`
                  : '🎉 You have qualified for FREE Delivery!'}
              </span>
              <span className="font-semibold text-[#1B3D2B]">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full bg-[#E5DCCF] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1B3D2B] h-full rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#785338]">
                  <ShoppingBag className="w-8 h-8 stroke-1 text-[#1B3D2B]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#1B3D2B]">Your cart is empty</h4>
                  <p className="text-xs text-[#785338] mt-1 max-w-xs">
                    Explore our handpicked dry fruits, cold pressed oils, and wholesome sweets.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToShop();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#EAE2D5] shadow-xs"
                >
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=200&q=80'}
                    alt={item.name}
                    className="w-18 h-18 object-cover rounded-xl shrink-0 bg-[#F4EFE6]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-semibold text-[#1B3D2B] truncate">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A89F91] hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="inline-block text-[11px] font-medium text-[#785338]">
                        Pack: {item.variantLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#EAE2D5] rounded-lg bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-[#EAE2D5] rounded-l-lg text-[#1B3D2B] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#1B3D2B]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-[#EAE2D5] rounded-r-lg text-[#1B3D2B] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#1B3D2B]">
                        ₹{(item.unitPrice * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Totals and Action Buttons */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EAE2D5] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#785338]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1B3D2B]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#785338]">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-[#1B3D2B]">
                    {deliveryFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F4EFE6] flex justify-between text-base font-bold text-[#1B3D2B]">
                  <span>Estimated Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToCheckout();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#1B3D2B] text-white font-semibold text-sm hover:bg-[#2A543A] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/919848856787?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 text-[#137333] border border-[#25D366]/30 font-semibold text-xs hover:bg-[#25D366]/25 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-[#25D366] text-transparent" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToShop();
                  }}
                  className="text-xs text-[#785338] hover:text-[#1B3D2B] underline"
                >
                  or Continue Browsing Products
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
