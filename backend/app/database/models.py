import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship
from backend.app.database.session import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    slug = Column(String(120), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    products = relationship("Product", back_populates="category", cascade="all, delete-orphan")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, index=True)
    slug = Column(String(220), unique=True, nullable=False, index=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False, index=True)
    
    short_description = Column(String(300), nullable=True)
    description = Column(Text, nullable=True)
    
    # Base price & weight
    price = Column(Float, nullable=False, default=0.0)
    compare_at_price = Column(Float, nullable=True)
    weight = Column(String(50), default="250g")
    unit = Column(String(20), default="gm")
    
    image = Column(String(500), nullable=True)
    gallery = Column(Text, nullable=True)  # JSON-encoded array of image URLs
    
    stock = Column(Integer, default=50)
    sku = Column(String(60), unique=True, nullable=True, index=True)
    is_available = Column(Boolean, default=True, index=True)
    is_featured = Column(Boolean, default=False, index=True)
    
    ingredients = Column(Text, nullable=True)
    storage_info = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    category = relationship("Category", back_populates="products")
    variants = relationship("ProductVariant", back_populates="product", cascade="all, delete-orphan")


class ProductVariant(Base):
    __tablename__ = "product_variants"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    weight_label = Column(String(50), nullable=False)  # e.g., "250g", "500g", "1kg", "500ml", "1 Litre", "Box of 12"
    price = Column(Float, nullable=False)
    compare_at_price = Column(Float, nullable=True)
    stock = Column(Integer, default=50)
    is_default = Column(Boolean, default=False)

    product = relationship("Product", back_populates="variants")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(200), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=True)
    role = Column(String(20), default="customer")  # "customer" or "admin"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    addresses = relationship("Address", back_populates="user", cascade="all, delete-orphan")
    orders = relationship("Order", back_populates="user")


class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    recipient_name = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=False)
    address_line1 = Column(String(300), nullable=False)
    address_line2 = Column(String(300), nullable=True)
    city = Column(String(100), nullable=False)
    state = Column(String(100), default="Telangana")
    pincode = Column(String(20), nullable=False)
    is_default = Column(Boolean, default=False)

    user = relationship("User", back_populates="addresses")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    
    # Customer Details
    customer_name = Column(String(150), nullable=False)
    customer_email = Column(String(200), nullable=True)
    customer_phone = Column(String(30), nullable=False)
    
    # Delivery Info
    delivery_address = Column(Text, nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False, default="Telangana")
    pincode = Column(String(20), nullable=False)
    delivery_instructions = Column(Text, nullable=True)
    
    # Amounts
    subtotal = Column(Float, nullable=False)
    delivery_fee = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)
    
    # Payment & Status
    payment_method = Column(String(50), default="cash_on_delivery")  # cash_on_delivery, whatsapp, online_razorpay
    payment_status = Column(String(30), default="pending")  # pending, completed, failed
    order_status = Column(String(30), default="pending")  # pending, confirmed, processing, ready, shipped, delivered, cancelled
    
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id = Column(Integer, nullable=True)
    product_name = Column(String(200), nullable=False)
    variant_label = Column(String(50), nullable=True)
    unit_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    total_price = Column(Float, nullable=False)
    image_url = Column(String(500), nullable=True)

    order = relationship("Order", back_populates="items")


class StoreSetting(Base):
    __tablename__ = "store_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False, index=True)
    value = Column(Text, nullable=False)
    description = Column(String(255), nullable=True)
