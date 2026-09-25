import math
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from typing import Optional, List

from backend.app.database.session import get_db
from backend.app.database.models import Product, Category, ProductVariant
from backend.app.schemas.schemas import ProductResponse, ProductListResponse

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("", response_model=ProductListResponse)
def get_products(
    category: Optional[str] = Query(None, description="Category slug"),
    search: Optional[str] = Query(None, description="Search query"),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    sort: Optional[str] = Query("featured", description="Sort by: featured, price_asc, price_desc, name_asc"),
    featured_only: Optional[bool] = Query(False),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.variants)
    ).filter(Product.is_available == True)

    if category:
        query = query.join(Product.category).filter(Category.slug == category)

    if search:
        search_filter = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Product.name.ilike(search_filter),
                Product.short_description.ilike(search_filter),
                Product.description.ilike(search_filter),
                Product.ingredients.ilike(search_filter)
            )
        )

    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    if featured_only:
        query = query.filter(Product.is_featured == True)

    # Sorting
    if sort == "price_asc":
        query = query.order_by(Product.price.asc())
    elif sort == "price_desc":
        query = query.order_by(Product.price.desc())
    elif sort == "name_asc":
        query = query.order_by(Product.name.asc())
    else:
        # featured default
        query = query.order_by(Product.is_featured.desc(), Product.id.asc())

    total = query.count()
    pages = math.ceil(total / limit) if total > 0 else 1
    offset = (page - 1) * limit
    items = query.offset(offset).limit(limit).all()

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": pages
    }

@router.get("/featured/list", response_model=List[ProductResponse])
def get_featured_products(limit: int = 8, db: Session = Depends(get_db)):
    products = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.variants)
    ).filter(Product.is_available == True, Product.is_featured == True).limit(limit).all()
    return products

@router.get("/{slug}", response_model=ProductResponse)
def get_product_by_slug(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.variants)
    ).filter(Product.slug == slug, Product.is_available == True).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
