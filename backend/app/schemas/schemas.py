from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
from datetime import datetime

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    display_order: int = 0
    is_active: bool = True

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    product_count: Optional[int] = 0
    model_config = ConfigDict(from_attributes=True)


# Product Variant Schemas
class ProductVariantBase(BaseModel):
    weight_label: str
    price: float
    compare_at_price: Optional[float] = None
    stock: int = 50
    is_default: bool = False

class ProductVariantCreate(ProductVariantBase):
    pass

class ProductVariantResponse(ProductVariantBase):
    id: int
    product_id: int
    model_config = ConfigDict(from_attributes=True)


# Product Schemas
class ProductBase(BaseModel):
    name: str
    slug: str
    category_id: int
    short_description: Optional[str] = None
    description: Optional[str] = None
    price: float
    compare_at_price: Optional[float] = None
    weight: str = "250g"
    unit: str = "gm"
    image: Optional[str] = None
    gallery: Optional[str] = None
    stock: int = 50
    sku: Optional[str] = None
    is_available: bool = True
    is_featured: bool = False
    ingredients: Optional[str] = None
    storage_info: Optional[str] = None

class ProductCreate(ProductBase):
    variants: Optional[List[ProductVariantCreate]] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    category_id: Optional[int] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    compare_at_price: Optional[float] = None
    weight: Optional[str] = None
    unit: Optional[str] = None
    image: Optional[str] = None
    gallery: Optional[str] = None
    stock: Optional[int] = None
    sku: Optional[str] = None
    is_available: Optional[bool] = None
    is_featured: Optional[bool] = None
    ingredients: Optional[str] = None
    storage_info: Optional[str] = None

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryResponse] = None
    variants: List[ProductVariantResponse] = []
    model_config = ConfigDict(from_attributes=True)

class ProductListResponse(BaseModel):
    items: List[ProductResponse]
    total: int
    page: int
    limit: int
    pages: int


# User & Auth Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# Order Schemas
class OrderItemCreate(BaseModel):
    product_id: Optional[int] = None
    product_name: str
    variant_label: Optional[str] = None
    unit_price: float
    quantity: int = 1
    image_url: Optional[str] = None

class OrderItemResponse(OrderItemCreate):
    id: int
    total_price: float
    model_config = ConfigDict(from_attributes=True)

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: Optional[EmailStr] = None
    customer_phone: str
    delivery_address: str
    city: str
    state: str = "Telangana"
    pincode: str
    delivery_instructions: Optional[str] = None
    payment_method: str = "cash_on_delivery" # cash_on_delivery, whatsapp, online_razorpay
    items: List[OrderItemCreate]
    notes: Optional[str] = None

class OrderStatusUpdate(BaseModel):
    order_status: str  # pending, confirmed, processing, ready, shipped, delivered, cancelled
    payment_status: Optional[str] = None

class OrderResponse(BaseModel):
    id: int
    order_number: str
    user_id: Optional[int] = None
    customer_name: str
    customer_email: Optional[str] = None
    customer_phone: str
    delivery_address: str
    city: str
    state: str
    pincode: str
    delivery_instructions: Optional[str] = None
    subtotal: float
    delivery_fee: float
    discount: float
    total_amount: float
    payment_method: str
    payment_status: str
    order_status: str
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemResponse] = []
    model_config = ConfigDict(from_attributes=True)

class OrderListResponse(BaseModel):
    items: List[OrderResponse]
    total: int
    page: int
    limit: int


# Admin Stats Schema
class AdminStatsResponse(BaseModel):
    total_orders: int
    pending_orders: int
    completed_orders: int
    total_revenue: float
    low_stock_products: int
    total_customers: int
    total_products: int


# Settings Schemas
class StoreSettingResponse(BaseModel):
    key: str
    value: str
    description: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class StoreSettingUpdate(BaseModel):
    value: str
