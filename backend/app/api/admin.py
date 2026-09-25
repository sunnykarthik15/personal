import os
import uuid
import shutil
from fastapi import APIRouter, Depends, HTTPException, Query, status, UploadFile, File
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from typing import List, Optional

from backend.app.config import settings
from backend.app.database.session import get_db
from backend.app.database.models import (
    Product, ProductVariant, Category, Order, OrderItem, User, StoreSetting
)
from backend.app.schemas.schemas import (
    ProductResponse, ProductCreate, ProductUpdate,
    OrderResponse, OrderStatusUpdate, OrderListResponse,
    AdminStatsResponse, CategoryResponse, CategoryCreate,
    UserResponse
)
from backend.app.auth.security import require_admin

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(require_admin)])

@router.post("/upload")
async def upload_product_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    file_ext = os.path.splitext(file.filename)[1] or ".jpg"
    unique_filename = f"{uuid.uuid4().hex}{file_ext}"

    # If Supabase Storage configured, upload via REST
    if settings.SUPABASE_URL and settings.SUPABASE_SERVICE_ROLE_KEY:
        try:
            import httpx
            file_bytes = await file.read()
            upload_url = f"{settings.SUPABASE_URL}/storage/v1/object/{settings.SUPABASE_STORAGE_BUCKET}/{unique_filename}"
            headers = {
                "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
                "Content-Type": file.content_type,
            }
            async with httpx.AsyncClient() as client:
                res = await client.post(upload_url, content=file_bytes, headers=headers)
                if res.status_code in [200, 201]:
                    public_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/{settings.SUPABASE_STORAGE_BUCKET}/{unique_filename}"
                    return {"url": public_url, "filename": unique_filename}
        except Exception as e:
            # Fall back to local uploads directory
            pass

    # Local storage fallback
    upload_dir = os.path.join(os.getcwd(), "backend", "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    public_url = f"/api/uploads/{unique_filename}"
    return {"url": public_url, "filename": unique_filename}

@router.get("/stats", response_model=AdminStatsResponse)
def get_admin_stats(db: Session = Depends(get_db)):
    total_orders = db.query(func.count(Order.id)).scalar() or 0
    pending_orders = db.query(func.count(Order.id)).filter(Order.order_status.in_(["pending", "confirmed", "processing"])).scalar() or 0
    completed_orders = db.query(func.count(Order.id)).filter(Order.order_status == "delivered").scalar() or 0
    
    total_revenue = db.query(func.sum(Order.total_amount)).filter(Order.order_status != "cancelled").scalar() or 0.0
    low_stock_products = db.query(func.count(Product.id)).filter(Product.stock <= 15).scalar() or 0
    total_customers = db.query(func.count(User.id)).filter(User.role == "customer").scalar() or 0
    total_products = db.query(func.count(Product.id)).scalar() or 0

    return {
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "completed_orders": completed_orders,
        "total_revenue": round(total_revenue, 2),
        "low_stock_products": low_stock_products,
        "total_customers": total_customers,
        "total_products": total_products
    }

# --- Products CRUD ---

@router.get("/products", response_model=List[ProductResponse])
def get_all_admin_products(db: Session = Depends(get_db)):
    products = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.variants)
    ).order_by(Product.id.desc()).all()
    return products

@router.post("/products", response_model=ProductResponse)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    # Verify slug uniqueness
    existing = db.query(Product).filter(Product.slug == product_in.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product slug already exists")

    variants_data = product_in.variants or []
    product_dict = product_in.model_dump(exclude={"variants"})
    if not product_dict.get("gallery") and product_dict.get("image"):
        product_dict["gallery"] = json.dumps([product_dict["image"]])

    product = Product(**product_dict)
    db.add(product)
    db.flush()

    for v_data in variants_data:
        variant = ProductVariant(
            product_id=product.id,
            **v_data.model_dump()
        )
        db.add(variant)

    db.commit()
    db.refresh(product)
    return product

@router.put("/products/{id}", response_model=ProductResponse)
def update_product(id: int, product_in: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = product_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully", "id": id}

# --- Orders Management ---

@router.get("/orders", response_model=OrderListResponse)
def get_admin_orders(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Order).options(joinedload(Order.items))
    
    if status and status != "all":
        query = query.filter(Order.order_status == status)

    if search:
        search_filter = f"%{search.strip()}%"
        query = query.filter(
            (Order.order_number.ilike(search_filter)) |
            (Order.customer_name.ilike(search_filter)) |
            (Order.customer_phone.ilike(search_filter)) |
            (Order.city.ilike(search_filter))
        )

    total = query.count()
    offset = (page - 1) * limit
    orders = query.order_by(Order.created_at.desc()).offset(offset).limit(limit).all()

    return {
        "items": orders,
        "total": total,
        "page": page,
        "limit": limit
    }

@router.put("/orders/{id}/status", response_model=OrderResponse)
def update_order_status(id: int, status_in: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.order_status = status_in.order_status
    if status_in.payment_status:
        order.payment_status = status_in.payment_status

    db.commit()
    db.refresh(order)
    return order

# --- Customer Accounts ---

@router.get("/customers", response_model=List[UserResponse])
def get_customers(db: Session = Depends(get_db)):
    customers = db.query(User).filter(User.role == "customer").order_by(User.created_at.desc()).all()
    return customers
