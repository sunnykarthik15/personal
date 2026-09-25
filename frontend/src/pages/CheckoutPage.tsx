import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, CheckCircle2, MessageCircle, 
  CreditCard, Banknote, AlertCircle, ShoppingBag, Truck 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

interface CheckoutPageProps {
  onBackToCart: () => void;
  onOrderSuccess: (orderNumber: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToCart, onOrderSuccess }) => {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();

  // Form Fields
  const [customerName, setCustomerName] = useState(user?.full_name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');
  const [pincode, setPincode] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'whatsapp' | 'online_razorpay'>('cash_on_delivery');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-[#1B3D2B]">Your cart is empty</h2>
        <p className="text-xs text-[#785338]">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={onBackToCart}
          className="px-6 py-2.5 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold"
        >
          View Cart
        </button>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form Validations
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!address.trim()) {
      setErrorMessage('Please enter your full delivery address.');
      return;
    }
    if (!pincode.trim() || pincode.replace(/\D/g, '').length !== 6) {
      setErrorMessage('Please enter a valid 6-digit postal PIN code.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        customer_email: customerEmail.trim() || undefined,
        delivery_address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        delivery_instructions: instructions.trim() || undefined,
        payment_method: paymentMethod,
        items: items.map((item) => ({
          product_id: item.productId,
          product_name: item.name,
          variant_label: item.variantLabel,
          unit_price: item.unitPrice,
          quantity: item.quantity,
          image_url: item.image,
        })),
        notes: instructions.trim() || undefined,
      };

      const createdOrder = await api.createOrder(orderPayload);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1B3D2B', '#C5A059', '#785338', '#FFFFFF'],
        });
      } catch {}

      // If user chose WhatsApp method, open WhatsApp with order summary
      if (paymentMethod === 'whatsapp') {
        const orderSummaryText = encodeURIComponent(
          `*Order Confirmed - #${createdOrder.order_number}*\n\n` +
          `Name: ${customerName}\nPhone: ${customerPhone}\n` +
          `Address: ${address}, ${city}, ${state} - ${pincode}\n\n` +
          `*Items Ordered:*\n` +
          items.map((i, idx) => `${idx + 1}. ${i.name} (${i.variantLabel}) × ${i.quantity} = ₹${i.unitPrice * i.quantity}`).join('\n') +
          `\n\n*Total Amount:* ₹${createdOrder.total_amount}\n\nPlease confirm my order dispatch!`
        );
        window.open(`https://wa.me/919848856787?text=${orderSummaryText}`, '_blank');
      }

      clearCart();
      onOrderSuccess(createdOrder.order_number);

    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrorMessage(err.message || 'Failed to place order. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
              Secure Delivery
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3D2B] mt-1">
              Checkout & Delivery Details
            </h1>
          </div>

          <button
            onClick={onBackToCart}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#785338] hover:text-[#1B3D2B]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Customer & Delivery Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Customer Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1B3D2B] flex items-center gap-2 pb-3 border-b border-[#F4EFE6]">
                <span className="w-6 h-6 rounded-full bg-[#1B3D2B] text-white text-xs flex items-center justify-center">1</span>
                <span>Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Karthik Sharma"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                    Mobile Phone (For Order Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 9848856787"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                    Email Address (Optional for Invoice)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1B3D2B] flex items-center gap-2 pb-3 border-b border-[#F4EFE6]">
                <span className="w-6 h-6 rounded-full bg-[#1B3D2B] text-white text-xs flex items-center justify-center">2</span>
                <span>Delivery Address</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                    House / Flat No., Street, Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Flat 302, Sri Sai Nilayam, Plot 14, Near Community Hall, Madhapur"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="500081"
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Ring bell twice / leave with security"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method Choice */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1B3D2B] flex items-center gap-2 pb-3 border-b border-[#F4EFE6]">
                <span className="w-6 h-6 rounded-full bg-[#1B3D2B] text-white text-xs flex items-center justify-center">3</span>
                <span>Select Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* Method 1: Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-[#1B3D2B] bg-[#FAF7F2] ring-1 ring-[#1B3D2B]'
                      : 'border-[#EAE2D5] bg-white hover:border-[#1B3D2B]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="mt-1 accent-[#1B3D2B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#1B3D2B]">
                      <Banknote className="w-4 h-4 text-[#C5A059]" />
                      <span>Cash on Delivery (Pay at Doorstep)</span>
                    </div>
                    <p className="text-xs text-[#785338] mt-0.5">
                      Pay by cash or scan your delivery partner's UPI QR code upon arrival.
                    </p>
                  </div>
                </label>

                {/* Method 2: Direct WhatsApp Ordering */}
                <label
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'border-[#1B3D2B] bg-[#FAF7F2] ring-1 ring-[#1B3D2B]'
                      : 'border-[#EAE2D5] bg-white hover:border-[#1B3D2B]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                    className="mt-1 accent-[#1B3D2B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#1B3D2B]">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Direct WhatsApp Order & Confirmation</span>
                    </div>
                    <p className="text-xs text-[#785338] mt-0.5">
                      Instantly forwards your order summary to Vaishno Karthik WhatsApp (9848856787) for direct verification.
                    </p>
                  </div>
                </label>

                {/* Method 3: Online Payment Placeholder Architecture */}
                <label
                  onClick={() => setPaymentMethod('online_razorpay')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'online_razorpay'
                      ? 'border-[#1B3D2B] bg-[#FAF7F2] ring-1 ring-[#1B3D2B]'
                      : 'border-[#EAE2D5] bg-white hover:border-[#1B3D2B]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'online_razorpay'}
                    onChange={() => setPaymentMethod('online_razorpay')}
                    className="mt-1 accent-[#1B3D2B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#1B3D2B]">
                      <CreditCard className="w-4 h-4 text-[#C5A059]" />
                      <span>UPI / Netbanking / Cards (Payment Gateway)</span>
                    </div>
                    <p className="text-xs text-[#785338] mt-0.5">
                      Architecture configured for Razorpay & UPI. Select this to record the order in our system; our team will share a verified direct payment link.
                    </p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Place Order Button */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-premium space-y-6 sticky top-28">
              <h3 className="font-serif font-bold text-xl text-[#1B3D2B] pb-3 border-b border-[#F4EFE6]">
                Order Items ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Items Summary List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-[#1B3D2B]">{item.quantity}×</span>
                      <span className="text-[#3E3228] truncate">{item.name}</span>
                      <span className="text-[#A89F91]">({item.variantLabel})</span>
                    </div>
                    <span className="font-bold text-[#1B3D2B] shrink-0">
                      ₹{(item.unitPrice * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-[#F4EFE6] space-y-2 text-xs text-[#785338]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1B3D2B]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Home Delivery Charges</span>
                  <span className="font-bold text-[#1B3D2B]">
                    {deliveryFee === 0 ? <span className="text-green-700">FREE</span> : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#F4EFE6] flex justify-between text-base font-bold text-[#1B3D2B]">
                  <span>Total Payable</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#1B3D2B] text-white font-semibold text-sm hover:bg-[#2A543A] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Placing Your Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Confirm & Place Order (₹{total.toFixed(0)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[11px] text-[#785338] justify-center pt-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Protected by Vaishno Karthik Purity Guarantee</span>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
