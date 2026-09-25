from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from backend.app.database.session import get_db
from backend.app.database.models import Category, Product
from backend.app.schemas.schemas import CategoryResponse, CategoryCreate
from backend.app.auth.security import require_admin

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).filter(Category.is_active == True).order_by(Category.display_order.asc()).all()
    results = []
    for cat in categories:
        count = db.query(func.count(Product.id)).filter(Product.category_id == cat.id, Product.is_available == True).scalar()
        cat_dict = {
            "id": cat.id,
            "name": cat.name,
            "slug": cat.slug,
            "description": cat.description,
            "image_url": cat.image_url,
            "display_order": cat.display_order,
            "is_active": cat.is_active,
            "product_count": count or 0
        }
        results.append(cat_dict)
    return results

@router.get("/{slug}", response_model=CategoryResponse)
def get_category_by_slug(slug: str, db: Session = Depends(get_db)):
    cat = db.query(Category).filter(Category.slug == slug, Category.is_active == True).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    count = db.query(func.count(Product.id)).filter(Product.category_id == cat.id, Product.is_available == True).scalar()
    return {
        "id": cat.id,
        "name": cat.name,
        "slug": cat.slug,
        "description": cat.description,
        "image_url": cat.image_url,
        "display_order": cat.display_order,
        "is_active": cat.is_active,
        "product_count": count or 0
    }
