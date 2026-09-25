export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  product_count?: number;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  weight_label: string;
  price: number;
  compare_at_price?: number;
  stock: number;
  is_default: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  short_description?: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  weight: string;
  unit: string;
  image?: string;
  gallery?: string;
  stock: number;
  sku?: string;
  is_available: boolean;
  is_featured: boolean;
  ingredients?: string;
  storage_info?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  variants: ProductVariant[];
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CartItem {
  id: string; // unique key (e.g. productId-variantLabel)
  productId: number;
  name: string;
  slug: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  image?: string;
  weight: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  role: 'customer' | 'admin';
  is_active: boolean;
  created_at: string;
}

export interface OrderItem {
  id?: number;
  product_id?: number;
  product_name: string;
  variant_label?: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  image_url?: string;
}

export interface Order {
  id: number;
  order_number: string;
  user_id?: number;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  delivery_address: string;
  city: string;
  state: string;
  pincode: string;
  delivery_instructions?: string;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total_amount: number;
  payment_method: 'cash_on_delivery' | 'whatsapp' | 'online_razorpay';
  payment_status: 'pending' | 'completed' | 'failed';
  order_status: 'pending' | 'confirmed' | 'processing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface StoreSettings {
  store_name: string;
  primary_phone: string;
  secondary_phone: string;
  whatsapp_number: string;
  free_delivery_above: string;
  standard_delivery_fee: string;
  upi_id: string;
  business_tagline: string;
  delivery_areas: string;
  razorpay_enabled: string;
}

export interface AdminStats {
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
  total_revenue: number;
  low_stock_products: number;
  total_customers: number;
  total_products: number;
}
