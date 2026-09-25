import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.config import settings

client = TestClient(app)

def test_health_and_root():
    # Test GET /health
    res_health = client.get("/health")
    assert res_health.status_code == 200
    assert res_health.json() == {"status": "healthy"}

    # Test GET /api/health
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_get_categories():
    response = client.get("/api/categories")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 4
    slugs = [c["slug"] for c in data]
    assert "nuts-dry-fruits" in slugs
    assert "seeds-spices" in slugs
    assert "cold-pressed-oils" in slugs
    assert "natural-jaggery-sweets" in slugs

def test_get_products_list():
    response = client.get("/api/products")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert data["total"] == 40
    assert len(data["items"]) > 0

def test_get_product_detail_badam():
    response = client.get("/api/products/badam-almonds")
    assert response.status_code == 200
    product = response.json()
    assert product["name"] == "Badam (Almonds)"
    assert len(product["variants"]) >= 1

def test_search_products():
    response = client.get("/api/products?search=oil")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 3

def test_filter_by_category():
    response = client.get("/api/products?category=cold-pressed-oils")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 3
    for item in data["items"]:
        assert item["category"]["slug"] == "cold-pressed-oils"

def test_create_order_flow():
    order_payload = {
        "customer_name": "Karthik Sharma",
        "customer_email": "karthik.customer@example.com",
        "customer_phone": "9848856787",
        "delivery_address": "Plot 42, Green Meadows, Madhapur",
        "city": "Hyderabad",
        "state": "Telangana",
        "pincode": "500081",
        "delivery_instructions": "Leave at front door",
        "payment_method": "cash_on_delivery",
        "items": [
            {
                "product_id": 1,
                "product_name": "Badam (Almonds)",
                "variant_label": "250g",
                "unit_price": 240.0,
                "quantity": 2,
                "image_url": "https://example.com/badam.jpg"
            }
        ]
    }
    response = client.post("/api/orders", json=order_payload)
    assert response.status_code == 200
    order_data = response.json()
    assert order_data["order_number"].startswith("VK-")
    assert order_data["subtotal"] == 480.0
    assert order_data["delivery_fee"] == 60.0  # Under 999 threshold
    assert order_data["total_amount"] == 540.0

    # Retrieve created order by number
    get_res = client.get(f"/api/orders/by-number/{order_data['order_number']}")
    assert get_res.status_code == 200
    assert get_res.json()["customer_name"] == "Karthik Sharma"

def test_admin_auth_protection():
    # Attempting to access admin stats without token must fail
    res = client.get("/api/admin/stats")
    assert res.status_code == 401

def test_admin_login_and_stats():
    login_res = client.post("/api/auth/login", json={
        "email": settings.ADMIN_EMAIL,
        "password": settings.ADMIN_PASSWORD
    })
    assert login_res.status_code == 200
    token_data = login_res.json()
    assert "access_token" in token_data
    token = token_data["access_token"]

    headers = {"Authorization": f"Bearer {token}"}
    stats_res = client.get("/api/admin/stats", headers=headers)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert "total_orders" in stats
    assert stats["total_products"] == 40

def test_admin_product_crud_and_order_update():
    login_res = client.post("/api/auth/login", json={
        "email": settings.ADMIN_EMAIL,
        "password": settings.ADMIN_PASSWORD
    })
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Create a product
    cat_res = client.get("/api/categories")
    cat_id = cat_res.json()[0]["id"]
    new_product_payload = {
        "name": "Special Festival Dry Fruit Combo",
        "slug": "special-festival-dry-fruit-combo",
        "category_id": cat_id,
        "short_description": "Curated festive dry fruits gift pack.",
        "description": "Royal festive assortment for special celebrations.",
        "price": 850.0,
        "compare_at_price": 999.0,
        "weight": "500g",
        "unit": "gm",
        "stock": 30,
        "sku": "VK-CMB-999",
        "is_available": True,
        "is_featured": True,
        "variants": [
            {"weight_label": "500g Box", "price": 850.0, "compare_at_price": 999.0, "is_default": True}
        ]
    }
    create_res = client.post("/api/admin/products", json=new_product_payload, headers=headers)
    assert create_res.status_code == 200
    prod_data = create_res.json()
    prod_id = prod_data["id"]
    assert prod_data["slug"] == "special-festival-dry-fruit-combo"

    # 2. Update the product price
    update_res = client.put(f"/api/admin/products/{prod_id}", json={"price": 820.0, "stock": 45}, headers=headers)
    assert update_res.status_code == 200
    assert update_res.json()["price"] == 820.0
    assert update_res.json()["stock"] == 45

    # 3. Create an order and update status via admin
    order_res = client.post("/api/orders", json={
        "customer_name": "Admin Tester",
        "customer_phone": "9848856787",
        "delivery_address": "Test Street",
        "city": "Hyderabad",
        "state": "Telangana",
        "pincode": "500001",
        "payment_method": "whatsapp",
        "items": [{
            "product_id": prod_id,
            "product_name": "Special Festival Dry Fruit Combo",
            "unit_price": 820.0,
            "quantity": 1
        }]
    })
    order_id = order_res.json()["id"]

    status_update = client.put(f"/api/admin/orders/{order_id}/status", json={
        "order_status": "confirmed",
        "payment_status": "pending"
    }, headers=headers)
    assert status_update.status_code == 200
    assert status_update.json()["order_status"] == "confirmed"

    # 4. Clean up created product
    del_res = client.delete(f"/api/admin/products/{prod_id}", headers=headers)
    assert del_res.status_code == 200
