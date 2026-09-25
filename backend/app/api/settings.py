from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict

from backend.app.database.session import get_db
from backend.app.database.models import StoreSetting
from backend.app.schemas.schemas import StoreSettingResponse, StoreSettingUpdate
from backend.app.auth.security import require_admin
from backend.app.config import settings

router = APIRouter(prefix="/settings", tags=["Settings"])

@router.get("/public", response_model=Dict[str, str])
def get_public_settings(db: Session = Depends(get_db)):
    db_settings = db.query(StoreSetting).all()
    result = {s.key: s.value for s in db_settings}
    
    # Defaults from config if not in DB
    result.setdefault("store_name", settings.PROJECT_NAME)
    result.setdefault("primary_phone", settings.PRIMARY_PHONE)
    result.setdefault("secondary_phone", settings.SECONDARY_PHONE)
    result.setdefault("whatsapp_number", settings.WHATSAPP_NUMBER)
    result.setdefault("free_delivery_above", "999")
    result.setdefault("standard_delivery_fee", "60")
    result.setdefault("upi_id", "vaishnokarthik@upi")
    result.setdefault("business_tagline", "Pure Goodness, Traditionally Crafted")
    result.setdefault("delivery_areas", "Hyderabad, Secunderabad, Telangana & Andhra Pradesh")
    result.setdefault("razorpay_enabled", "false")
    return result

@router.get("", response_model=List[StoreSettingResponse], dependencies=[Depends(require_admin)])
def get_all_settings(db: Session = Depends(get_db)):
    return db.query(StoreSetting).all()

@router.put("/{key}", response_model=StoreSettingResponse, dependencies=[Depends(require_admin)])
def update_setting(key: str, setting_in: StoreSettingUpdate, db: Session = Depends(get_db)):
    setting = db.query(StoreSetting).filter(StoreSetting.key == key).first()
    if not setting:
        setting = StoreSetting(key=key, value=setting_in.value)
        db.add(setting)
    else:
        setting.value = setting_in.value
    
    db.commit()
    db.refresh(setting)
    return setting
