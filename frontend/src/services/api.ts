import {
  Category, Product, ProductListResponse, Order, StoreSettings,
  AdminStats, User
} from '../types';

const getBaseUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }
  if (import.meta.env.DEV) {
    return 'http://127.0.0.1:8000/api';
  }
  return '/api';
};

const BASE_URL = getBaseUrl();

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('vk_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMsg = errorData.detail || errorData.message || response.statusText;
    } catch {
      errorMsg = response.statusText;
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

export const api = {
  // Categories
  getCategories: () => request<Category[]>('/categories'),
  getCategoryBySlug: (slug: string) => request<Category>(`/categories/${slug}`),

  // Products
  getProducts: (params?: {
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    sort?: string;
    featured_only?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.min_price !== undefined) query.append('min_price', params.min_price.toString());
    if (params?.max_price !== undefined) query.append('max_price', params.max_price.toString());
    if (params?.sort) query.append('sort', params.sort);
    if (params?.featured_only) query.append('featured_only', 'true');
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    return request<ProductListResponse>(`/products?${query.toString()}`);
  },

  getProductBySlug: (slug: string) => request<Product>(`/products/${slug}`),
  getFeaturedProducts: (limit = 8) => request<Product[]>(`/products/featured/list?limit=${limit}`),

  // Orders
  createOrder: (orderData: {
    customer_name: string;
    customer_email?: string;
    customer_phone: string;
    delivery_address: string;
    city: string;
    state?: string;
    pincode: string;
    delivery_instructions?: string;
    payment_method: string;
    items: Array<{
      product_id?: number;
      product_name: string;
      variant_label?: string;
      unit_price: number;
      quantity: number;
      image_url?: string;
    }>;
    notes?: string;
  }) => request<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),

  getOrderByNumber: (orderNumber: string) => request<Order>(`/orders/by-number/${orderNumber}`),
  getMyOrders: () => request<Order[]>('/orders/my'),

  // Store Settings
  getPublicSettings: () => request<StoreSettings>('/settings/public'),

  // Auth
  login: (email: string, password: string) =>
    request<{ access_token: string; token_type: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: { email: string; password: string; full_name: string; phone?: string }) =>
    request<{ access_token: string; token_type: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => request<User>('/auth/me'),

  // Admin Protected
  getAdminStats: () => request<AdminStats>('/admin/stats'),
  getAdminProducts: () => request<Product[]>('/admin/products'),
  createAdminProduct: (productData: any) =>
    request<Product>('/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
  updateAdminProduct: (id: number, productData: any) =>
    request<Product>(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),
  deleteAdminProduct: (id: number) =>
    request<{ message: string; id: number }>(`/admin/products/${id}`, {
      method: 'DELETE',
    }),

  getAdminOrders: (params?: { status?: string; search?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.search) query.append('search', params.search);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    return request<{ items: Order[]; total: number; page: number; limit: number }>(`/admin/orders?${query.toString()}`);
  },

  updateOrderStatus: (id: number, statusData: { order_status: string; payment_status?: string }) =>
    request<Order>(`/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    }),

  updateAdminSetting: (key: string, value: string) =>
    request<any>(`/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }),
};
