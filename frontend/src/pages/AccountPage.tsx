import React, { useEffect, useState } from 'react';
import { User, Order } from '../types';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  ShoppingBag, Clock, PackageCheck, User as UserIcon, 
  Phone, Mail, MapPin, LogOut, ShieldCheck, ArrowRight 
} from 'lucide-react';

interface AccountPageProps {
  onNavigateToShop: () => void;
  onNavigateToOrderDetails?: (orderNumber: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigateToShop, onNavigateToOrderDetails }) => {
  const { user, isAuthenticated, logout, setIsAuthModalOpen, setAuthModalMode } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      api.getMyOrders()
        .then(setOrders)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-20 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EAE2D5] shadow-premium text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#1B3D2B] flex items-center justify-center mx-auto border border-[#EAE2D5]">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-2xl text-[#1B3D2B]">Customer Account</h2>
            <p className="text-xs text-[#785338] mt-1">
              Please sign in to view your order history, delivery details, and account preferences.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#1B3D2B] text-white font-semibold text-xs hover:bg-[#2A543A] shadow-md"
            >
              Sign In to Your Account
            </button>
            <button
              onClick={() => {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] text-[#1B3D2B] border border-[#EAE2D5] font-semibold text-xs hover:bg-[#EAE2D5]"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800">Delivered</span>;
      case 'shipped':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Shipped</span>;
      case 'processing':
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Processing</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800">Order Placed</span>;
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#1B3D2B] text-white flex items-center justify-center font-serif text-2xl font-bold">
              {user?.full_name ? user.full_name[0] : 'V'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-2xl text-[#1B3D2B]">{user?.full_name}</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1B3D2B]/10 text-[#1B3D2B]">
                  {user?.role}
                </span>
              </div>
              <p className="text-xs text-[#785338] flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-[#A89F91]" />
                <span>{user?.email}</span>
                {user?.phone && (
                  <>
                    <span>•</span>
                    <Phone className="w-3.5 h-3.5 text-[#A89F91]" />
                    <span>{user.phone}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-premium space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F4EFE6]">
            <div>
              <h2 className="font-serif font-bold text-2xl text-[#1B3D2B]">Order History</h2>
              <p className="text-xs text-[#785338]">Past orders placed with your account</p>
            </div>
            <button
              onClick={onNavigateToShop}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B3D2B] hover:underline"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-[#785338]">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#A89F91] mx-auto" />
              <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">No orders found yet</h3>
              <p className="text-xs text-[#785338] max-w-sm mx-auto">
                Once you place an order, you can track its progress and view item breakdowns here.
              </p>
              <button
                onClick={onNavigateToShop}
                className="px-6 py-2.5 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE2D5] pb-3">
                    <div>
                      <span className="text-xs text-[#785338] uppercase">Order ID: </span>
                      <strong className="text-sm font-serif font-bold text-[#1B3D2B]">
                        #{ord.order_number}
                      </strong>
                      <span className="text-[11px] text-[#A89F91] ml-3">
                        {new Date(ord.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(ord.order_status)}
                      <span className="text-sm font-bold text-[#1B3D2B] ml-2">₹{ord.total_amount.toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#5A493E]">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span>{it.quantity}× {it.product_name} ({it.variant_label || 'Std Pack'})</span>
                        <span className="font-medium">₹{it.total_price.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] text-[#785338] flex items-center justify-between">
                    <span>Delivered to: {ord.delivery_address}, {ord.city}</span>
                    <span className="capitalize font-semibold text-[#1B3D2B]">Payment: {ord.payment_method.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
