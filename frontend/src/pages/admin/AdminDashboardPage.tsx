import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Package, ShoppingCart, Users, Settings as SettingsIcon, 
  Plus, Edit2, Trash2, ShieldCheck, AlertTriangle, CheckCircle, 
  Search, Eye, RefreshCw, LogOut, ArrowRight, DollarSign 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { AdminStats, Product, Order, Category, StoreSettings } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, logout, setIsAuthModalOpen, setAuthModalMode } = useAuth();

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');

  // Stats
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Products
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(null);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Load initial data if admin
  useEffect(() => {
    if (isAdmin) {
      loadStats();
      loadProducts();
      loadOrders();
      loadSettings();
      api.getCategories().then(setCategories).catch(console.error);
    }
  }, [isAdmin]);

  const loadStats = () => {
    setLoadingStats(true);
    api.getAdminStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoadingStats(false));
  };

  const loadProducts = () => {
    api.getAdminProducts()
      .then(setProducts)
      .catch(console.error);
  };

  const loadOrders = (status?: string) => {
    api.getAdminOrders({ status: status || orderStatusFilter, limit: 50 })
      .then((res) => setOrders(res.items))
      .catch(console.error);
  };

  const loadSettings = () => {
    api.getPublicSettings()
      .then(setStoreSettings)
      .catch(console.error);
  };

  if (!isAdmin) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EAE2D5] shadow-premium text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-2xl text-[#1B3D2B]">Admin Access Required</h2>
            <p className="text-xs text-[#785338] mt-1">
              The Vaishno Karthik administrative portal is protected. Please sign in with authorized store manager credentials.
            </p>
          </div>
          <button
            onClick={() => {
              setAuthModalMode('login');
              setIsAuthModalOpen(true);
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#1B3D2B] text-white font-semibold text-xs hover:bg-[#2A543A] shadow-md"
          >
            Sign In with Admin Account
          </button>
          <p className="text-[11px] text-[#A89F91]">
            Default Review Credentials: <code>admin@vaishnokarthik.com</code>
          </p>
        </div>
      </div>
    );
  }

  // Handle Order Status Update
  const handleOrderStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, { order_status: newStatus });
      loadOrders();
      loadStats();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product from the catalog?')) {
      try {
        await api.deleteAdminProduct(id);
        loadProducts();
        loadStats();
      } catch (err) {
        console.error('Failed to delete product', err);
      }
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku?.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Store Control Portal
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1B3D2B] text-white">
                Admin Active
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1B3D2B] mt-0.5">
              Vaishno Karthik Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                loadStats();
                loadProducts();
                loadOrders();
              }}
              className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#1B3D2B] border border-[#EAE2D5] hover:bg-[#EAE2D5] transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-[#EAE2D5] shadow-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-[130px] py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#1B3D2B] text-white shadow-xs'
                : 'text-[#785338] hover:text-[#1B3D2B] hover:bg-[#FAF7F2]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 min-w-[130px] py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#1B3D2B] text-white shadow-xs'
                : 'text-[#785338] hover:text-[#1B3D2B] hover:bg-[#FAF7F2]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 min-w-[130px] py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#1B3D2B] text-white shadow-xs'
                : 'text-[#785338] hover:text-[#1B3D2B] hover:bg-[#FAF7F2]'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 min-w-[130px] py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#1B3D2B] text-white shadow-xs'
                : 'text-[#785338] hover:text-[#1B3D2B] hover:bg-[#FAF7F2]'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Store Settings</span>
          </button>
        </div>

        {/* --- TAB 1: OVERVIEW & KPIS --- */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-3xl border border-[#EAE2D5] shadow-xs">
                <span className="text-xs text-[#785338] uppercase font-bold tracking-wider">Total Sales Revenue</span>
                <p className="font-serif font-bold text-3xl text-[#1B3D2B] mt-2">
                  ₹{stats ? stats.total_revenue.toFixed(0) : '0'}
                </p>
                <span className="text-[11px] text-green-700 font-medium">From non-cancelled orders</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#EAE2D5] shadow-xs">
                <span className="text-xs text-[#785338] uppercase font-bold tracking-wider">Orders Count</span>
                <p className="font-serif font-bold text-3xl text-[#1B3D2B] mt-2">
                  {stats?.total_orders || 0}
                </p>
                <span className="text-[11px] text-[#785338]">
                  {stats?.pending_orders || 0} Pending dispatch
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#EAE2D5] shadow-xs">
                <span className="text-xs text-[#785338] uppercase font-bold tracking-wider">Catalog Items</span>
                <p className="font-serif font-bold text-3xl text-[#1B3D2B] mt-2">
                  {stats?.total_products || 40}
                </p>
                <span className="text-[11px] text-[#785338]">Active seed products</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#EAE2D5] shadow-xs">
                <span className="text-xs text-[#785338] uppercase font-bold tracking-wider">Low Stock Notice</span>
                <p className="font-serif font-bold text-3xl text-amber-700 mt-2">
                  {stats?.low_stock_products || 0}
                </p>
                <span className="text-[11px] text-amber-600 font-medium">Items with ≤ 15 packs</span>
              </div>

            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-premium space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F4EFE6]">
                <h3 className="font-serif font-bold text-xl text-[#1B3D2B]">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-[#1B3D2B] hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              {orders.length === 0 ? (
                <p className="text-xs text-[#785338] py-6 text-center">No orders registered yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#F4EFE6] text-[#785338]">
                        <th className="py-2.5 font-bold">Order #</th>
                        <th className="py-2.5 font-bold">Customer</th>
                        <th className="py-2.5 font-bold">Phone</th>
                        <th className="py-2.5 font-bold">Amount</th>
                        <th className="py-2.5 font-bold">Payment</th>
                        <th className="py-2.5 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4EFE6]">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-[#FAF7F2]">
                          <td className="py-3 font-bold text-[#1B3D2B]">#{o.order_number}</td>
                          <td className="py-3 text-[#3E3228]">{o.customer_name}</td>
                          <td className="py-3 text-[#785338]">{o.customer_phone}</td>
                          <td className="py-3 font-bold text-[#1B3D2B]">₹{o.total_amount.toFixed(0)}</td>
                          <td className="py-3 capitalize text-[#785338]">{o.payment_method.replace(/_/g, ' ')}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1B3D2B]/10 text-[#1B3D2B] capitalize">
                              {o.order_status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 2: PRODUCTS MANAGEMENT --- */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-premium space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F4EFE6]">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#1B3D2B]">Product Inventory</h3>
                <p className="text-xs text-[#785338]">Manage pricing, stock counts, and featured highlights</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search product..."
                    className="pl-9 pr-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-xs focus:outline-hidden"
                  />
                </div>
                <button
                  onClick={() => setIsCreatingProduct(true)}
                  className="px-4 py-2 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F4EFE6] text-[#785338]">
                    <th className="py-3 font-bold">Image</th>
                    <th className="py-3 font-bold">Product Name</th>
                    <th className="py-3 font-bold">Category</th>
                    <th className="py-3 font-bold">Price</th>
                    <th className="py-3 font-bold">Pack Size</th>
                    <th className="py-3 font-bold">Stock</th>
                    <th className="py-3 font-bold">Featured</th>
                    <th className="py-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EFE6]">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF7F2]">
                      <td className="py-2.5">
                        <img
                          src={prod.image || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=100&q=80'}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded-lg bg-[#F4EFE6]"
                        />
                      </td>
                      <td className="py-2.5 font-bold text-[#1B3D2B] max-w-[200px] truncate">
                        {prod.name}
                      </td>
                      <td className="py-2.5 text-[#785338]">{prod.category?.name}</td>
                      <td className="py-2.5 font-bold text-[#1B3D2B]">₹{prod.price.toFixed(0)}</td>
                      <td className="py-2.5 text-[#785338]">{prod.weight}</td>
                      <td className="py-2.5">
                        <span className={`font-semibold ${prod.stock <= 15 ? 'text-amber-600' : 'text-green-700'}`}>
                          {prod.stock} units
                        </span>
                      </td>
                      <td className="py-2.5">
                        <button
                          onClick={async () => {
                            await api.updateAdminProduct(prod.id, { is_featured: !prod.is_featured });
                            loadProducts();
                          }}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            prod.is_featured
                              ? 'bg-[#1B3D2B] text-white'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {prod.is_featured ? 'Yes' : 'No'}
                        </button>
                      </td>
                      <td className="py-2.5 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-1.5 rounded-lg bg-[#FAF7F2] text-[#1B3D2B] hover:bg-[#EAE2D5]"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: ORDERS MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-premium space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F4EFE6]">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#1B3D2B]">Customer Orders</h3>
                <p className="text-xs text-[#785338]">Update live delivery statuses and review address destinations</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#785338]">Filter:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => {
                    setOrderStatusFilter(e.target.value);
                    loadOrders(e.target.value);
                  }}
                  className="bg-[#FAF7F2] border border-[#EAE2D5] text-xs font-semibold text-[#1B3D2B] rounded-xl px-3 py-2"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-[#785338] py-8 text-center">No orders match this status filter.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE2D5] pb-3">
                      <div>
                        <span className="text-xs text-[#785338]">Order ID: </span>
                        <strong className="text-sm font-serif font-bold text-[#1B3D2B]">
                          #{order.order_number}
                        </strong>
                        <span className="text-xs text-[#785338] ml-3">
                          {new Date(order.created_at).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#785338]">Change Status:</span>
                        <select
                          value={order.order_status}
                          onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                          className="bg-white border border-[#EAE2D5] text-xs font-bold text-[#1B3D2B] rounded-lg px-2.5 py-1.5 focus:outline-hidden"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="ready">Ready</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-bold text-[#1B3D2B]">Customer & Address:</p>
                        <p className="text-[#3E3228] mt-1">{order.customer_name} ({order.customer_phone})</p>
                        <p className="text-[#785338]">{order.delivery_address}</p>
                        <p className="text-[#785338]">{order.city}, {order.state} - {order.pincode}</p>
                        {order.delivery_instructions && (
                          <p className="text-amber-800 italic mt-1">Note: {order.delivery_instructions}</p>
                        )}
                      </div>

                      <div>
                        <p className="font-bold text-[#1B3D2B]">Order Items:</p>
                        <div className="mt-1 space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-[#5A493E]">
                              <span>{it.quantity}× {it.product_name} ({it.variant_label})</span>
                              <span className="font-medium">₹{it.total_price.toFixed(0)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-[#EAE2D5] flex justify-between font-bold text-[#1B3D2B]">
                          <span>Total Amount:</span>
                          <span>₹{order.total_amount.toFixed(2)} ({order.payment_method})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: STORE SETTINGS --- */}
        {activeTab === 'settings' && storeSettings && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-premium space-y-6 max-w-3xl animate-fade-in">
            <div className="pb-4 border-b border-[#F4EFE6]">
              <h3 className="font-serif font-bold text-2xl text-[#1B3D2B]">Store Configuration</h3>
              <p className="text-xs text-[#785338]">Customize official business contact numbers, delivery limits, and tagline</p>
            </div>

            {settingsSuccess && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700">
                ✓ Store settings successfully saved!
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await api.updateAdminSetting('primary_phone', storeSettings.primary_phone);
                  await api.updateAdminSetting('secondary_phone', storeSettings.secondary_phone);
                  await api.updateAdminSetting('whatsapp_number', storeSettings.whatsapp_number);
                  await api.updateAdminSetting('free_delivery_above', storeSettings.free_delivery_above);
                  setSettingsSuccess(true);
                  setTimeout(() => setSettingsSuccess(false), 3000);
                } catch (err) {
                  console.error(err);
                }
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-[#4A3B32] mb-1">Primary Phone Number (From Poster)</label>
                <input
                  type="text"
                  value={storeSettings.primary_phone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, primary_phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-[#4A3B32] mb-1">Secondary Phone Number (From Poster)</label>
                <input
                  type="text"
                  value={storeSettings.secondary_phone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, secondary_phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-[#4A3B32] mb-1">WhatsApp Business Number</label>
                <input
                  type="text"
                  value={storeSettings.whatsapp_number}
                  onChange={(e) => setStoreSettings({ ...storeSettings, whatsapp_number: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-[#4A3B32] mb-1">Free Delivery Cart Threshold (₹)</label>
                <input
                  type="number"
                  value={storeSettings.free_delivery_above}
                  onChange={(e) => setStoreSettings({ ...storeSettings, free_delivery_above: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-[#1B3D2B] text-white font-semibold text-xs hover:bg-[#2A543A] shadow-md"
              >
                Save Store Settings
              </button>
            </form>
          </div>
        )}

        {/* Modal: Edit / Create Product */}
        {(editingProduct || isCreatingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#EAE2D5] shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#1B3D2B]">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Add New Catalog Product'}
              </h3>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as any;
                  if (editingProduct) {
                    await api.updateAdminProduct(editingProduct.id, {
                      price: parseFloat(form.price.value),
                      stock: parseInt(form.stock.value),
                      weight: form.weight.value,
                      image: form.image.value,
                      short_description: form.short_description.value,
                    });
                  } else {
                    await api.createAdminProduct({
                      name: form.name.value,
                      slug: form.name.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      category_id: parseInt(form.category_id.value),
                      price: parseFloat(form.price.value),
                      weight: form.weight.value,
                      stock: parseInt(form.stock.value),
                      image: form.image.value,
                      short_description: form.short_description.value,
                      description: form.short_description.value,
                    });
                  }
                  setEditingProduct(null);
                  setIsCreatingProduct(false);
                  loadProducts();
                }}
                className="space-y-3 text-xs"
              >
                {!editingProduct && (
                  <div>
                    <label className="block font-bold mb-1">Product Name</label>
                    <input name="name" required className="w-full p-2 bg-[#FAF7F2] rounded-lg border border-[#EAE2D5]" />
                  </div>
                )}

                {!editingProduct && (
                  <div>
                    <label className="block font-bold mb-1">Category</label>
                    <select name="category_id" className="w-full p-2 bg-[#FAF7F2] rounded-lg border border-[#EAE2D5]">
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Price (₹)</label>
                    <input
                      name="price"
                      type="number"
                      step="0.5"
                      defaultValue={editingProduct?.price || 200}
                      required
                      className="w-full p-2 bg-[#FAF7F2] rounded-lg border border-[#EAE2D5]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Stock Quantity</label>
                    <input
                      name="stock"
                      type="number"
                      defaultValue={editingProduct?.stock || 50}
                      required
                      className="w-full p-2 bg-[#FAF7F2] rounded-lg border border-[#EAE2D5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Pack Size / Weight</label>
                  <input
                    name="weight"
                    defaultValue={editingProduct?.weight || '250g'}
                    required
                    className="w-full p-2 bg-[#FAF7F2] rounded-lg border border-[#EAE2D5]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Image URL</label>
                  <input
                    name="image"
                    defaultValue={editingProduct?.image || ''}
                    placeholder="https://..."
                    className="w-full p-2 bg-[#FAF7F2] rounded-lg border border-[#EAE2D5]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Short Description</label>
                  <textarea
                    name="short_description"
                    defaultValue={editingProduct?.short_description || ''}
                    rows={2}
                    className="w-full p-2 bg-[#FAF7F2] rounded-lg border border-[#EAE2D5]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setIsCreatingProduct(false);
                    }}
                    className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1B3D2B] text-white font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
