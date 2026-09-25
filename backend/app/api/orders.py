import uuid
import datetime
import urllib.parse
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional

from backend.app.database.session import get_db
from backend.app.database.models import Order, OrderItem, StoreSetting, User
from backend.app.schemas.schemas import OrderCreate, OrderResponse
from backend.app.auth.security import get_current_user
from backend.app.config import settings

router = APIRouter(prefix="/orders", tags=["Orders"])

def generate_order_number() -> str:
    timestamp = datetime.datetime.now().strftime("%y%m%d")
    unique_suffix = uuid.uuid4().hex[:4].upper()
    return f"VK-{timestamp}-{unique_suffix}"

@router.post("", response_model=OrderResponse)
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    if not order_in.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    # Calculate subtotal
    subtotal = 0.0
    for item in order_in.items:
        if item.quantity <= 0 or item.unit_price < 0:
            raise HTTPException(status_code=400, detail="Invalid quantity or price")
        subtotal += item.unit_price * item.quantity

    # Fetch store delivery fee settings
    free_delivery_setting = db.query(StoreSetting).filter(StoreSetting.key == "free_delivery_above").first()
    fee_setting = db.query(StoreSetting).filter(StoreSetting.key == "standard_delivery_fee").first()

    free_delivery_threshold = float(free_delivery_setting.value) if free_delivery_setting else 999.0
    standard_fee = float(fee_setting.value) if fee_setting else 60.0

    delivery_fee = 0.0 if subtotal >= free_delivery_threshold else standard_fee
    discount = 0.0
    total_amount = subtotal + delivery_fee - discount

    order_number = generate_order_number()

    new_order = Order(
        order_number=order_number,
        user_id=current_user.id if current_user else None,
        customer_name=order_in.customer_name,
        customer_email=str(order_in.customer_email) if order_in.customer_email else None,
        customer_phone=order_in.customer_phone,
        delivery_address=order_in.delivery_address,
        city=order_in.city,
        state=order_in.state,
        pincode=order_in.pincode,
        delivery_instructions=order_in.delivery_instructions,
        subtotal=round(subtotal, 2),
        delivery_fee=round(delivery_fee, 2),
        discount=discount,
        total_amount=round(total_amount, 2),
        payment_method=order_in.payment_method,
        payment_status="pending",
        order_status="pending",
        notes=order_in.notes
    )

    db.add(new_order)
    db.flush()

    for item in order_in.items:
        item_total = round(item.unit_price * item.quantity, 2)
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            variant_label=item.variant_label,
            unit_price=round(item.unit_price, 2),
            quantity=item.quantity,
            total_price=item_total,
            image_url=item.image_url
        )
        db.add(order_item)

    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/by-number/{order_number}", response_model=OrderResponse)
def get_order_by_number(order_number: str, db: Session = Depends(get_db)):
    order = db.query(Order).options(joinedload(Order.items)).filter(Order.order_number == order_number).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/my", response_model=List[OrderResponse])
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")
    orders = db.query(Order).options(joinedload(Order.items)).filter(
        Order.user_id == current_user.id
    ).order_by(Order.created_at.desc()).all()
    return orders
