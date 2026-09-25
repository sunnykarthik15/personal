import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, PackageCheck, MessageCircle, Phone, 
  MapPin, ShoppingBag, ArrowRight 
} from 'lucide-react';
import { Order } from '../types';
import { api } from '../services/api';

interface OrderSuccessPageProps {
  orderNumber: string;
  onNavigateToShop: () => void;
  onNavigateToHome: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  orderNumber,
  onNavigateToShop,
  onNavigateToHome,
}) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      api.getOrderByNumber(orderNumber)
        .then(setOrder)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [orderNumber]);

  const generateWhatsAppConfirmation = () => {
    if (!order) return '';
    const text = encodeURIComponent(
      `Hello Vaishno Karthik!\nI have placed order *#${order.order_number}*.\nName: ${order.customer_name}\nPhone: ${order.customer_phone}\nTotal: ₹${order.total_amount}\n\nPlease share dispatch details.`
    );
    return text;
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE2D5] shadow-premium text-center space-y-6">
          
          {/* Animated Celebration Icon */}
          <div className="w-20 h-20 rounded-full bg-[#1B3D2B]/10 text-[#1B3D2B] flex items-center justify-center mx-auto border-2 border-[#1B3D2B]/20">
            <CheckCircle2 className="w-10 h-10 text-[#1B3D2B]" />
          </div>

          <div>
            <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
              Thank You for Your Order
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3D2B] mt-1">
              Order Successfully Received!
            </h1>
            <p className="text-sm text-[#785338] mt-2 max-w-md mx-auto">
              We are preparing your fresh batch of wholesome dry fruits, cold pressed oils, and authentic natural jaggery sweets.
            </p>
          </div>

          {/* Order Reference Pill */}
          <div className="inline-block bg-[#FAF7F2] border border-[#EAE2D5] px-6 py-3 rounded-2xl">
            <span className="text-xs text-[#785338] block uppercase tracking-wider">Order Reference ID</span>
            <strong className="text-xl font-serif font-bold text-[#1B3D2B] tracking-wide">
              {orderNumber}
            </strong>
          </div>

          {/* WhatsApp Direct Confirmation Button */}
          <div className="pt-2">
            <a
              href={`https://wa.me/919848856787?text=${generateWhatsAppConfirmation()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1EBE5D] transition-all shadow-md active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Connect on WhatsApp for Instant Updates</span>
            </a>
          </div>

          {/* Order Details Breakdown */}
          {order && (
            <div className="mt-8 pt-8 border-t border-[#F4EFE6] text-left space-y-6">
              
              {/* Delivery Address */}
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EAE2D5] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B3D2B] uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Delivery Destination</span>
                </div>
                <p className="text-sm font-semibold text-[#1B3D2B]">{order.customer_name} ({order.customer_phone})</p>
                <p className="text-xs text-[#785338]">{order.delivery_address}</p>
                <p className="text-xs text-[#785338]">{order.city}, {order.state} - {order.pincode}</p>
              </div>

              {/* Items Breakdown */}
              <div>
                <h4 className="font-serif font-bold text-base text-[#1B3D2B] mb-3">Items in This Order</h4>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-[#F4EFE6]">
                      <div>
                        <span className="font-semibold text-[#1B3D2B]">{item.product_name}</span>
                        <span className="text-[#785338] ml-2">({item.variant_label || 'Std Pack'}) × {item.quantity}</span>
                      </div>
                      <span className="font-bold text-[#1B3D2B]">₹{item.total_price.toFixed(0)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 space-y-1.5 text-xs text-[#785338]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-[#1B3D2B]">₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span className="font-semibold text-[#1B3D2B]">
                      {order.delivery_fee === 0 ? 'FREE' : `₹${order.delivery_fee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#1B3D2B] pt-2 border-t border-[#F4EFE6]">
                    <span>Total Amount:</span>
                    <span>₹{order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Store Contact Info from poster */}
              <div className="p-4 rounded-2xl bg-[#1B3D2B]/5 border border-[#1B3D2B]/15 text-xs text-[#1B3D2B] space-y-1">
                <p className="font-bold">Need assistance with your delivery?</p>
                <p className="text-[#785338]">
                  Call our customer team directly at <a href="tel:9848856787" className="font-bold underline text-[#1B3D2B]">9848856787</a> or <a href="tel:9642145789" className="font-bold underline text-[#1B3D2B]">9642145789</a>.
                </p>
              </div>

            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToShop}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={onNavigateToHome}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#FAF7F2] text-[#1B3D2B] border border-[#EAE2D5] text-xs font-semibold hover:bg-[#EAE2D5] transition-colors"
            >
              Back to Home
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
