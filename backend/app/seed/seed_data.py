import json
from sqlalchemy.orm import Session
from backend.app.database.session import SessionLocal, engine, Base
from backend.app.database.models import Category, Product, ProductVariant, User, StoreSetting
from backend.app.auth.security import get_password_hash
from backend.app.config import settings

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Category).first() is not None:
            print("Database already seeded. Skipping initial seeding.")
            return

        print("Seeding database with Vaishno Karthik catalog...")

        # 1. Admin User
        admin_user = User(
            email=settings.ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
            full_name="Vaishno Karthik Store Manager",
            phone=settings.PRIMARY_PHONE,
            role="admin",
            is_active=True
        )
        db.add(admin_user)

        # 2. Store Settings
        default_settings = [
            ("store_name", settings.PROJECT_NAME, "Official Business Title"),
            ("primary_phone", settings.PRIMARY_PHONE, "Primary Order Phone Number"),
            ("secondary_phone", settings.SECONDARY_PHONE, "Secondary Support Phone Number"),
            ("whatsapp_number", settings.WHATSAPP_NUMBER, "Direct WhatsApp Ordering Number"),
            ("business_tagline", "Pure Goodness, Traditionally Crafted", "Store Tagline"),
            ("free_delivery_above", "999", "Minimum cart value in INR for free delivery"),
            ("standard_delivery_fee", "60", "Flat delivery charge when under threshold"),
            ("upi_id", "vaishnokarthik@upi", "UPI VPA for direct QR payments"),
            ("delivery_areas", "Hyderabad, Secunderabad, Telangana & Andhra Pradesh", "Primary Delivery Reach"),
            ("razorpay_enabled", "false", "Enable Razorpay payment gateway when API keys are configured"),
        ]
        for key, val, desc in default_settings:
            db.add(StoreSetting(key=key, value=val, description=desc))

        # 3. Categories
        categories_data = [
            {
                "name": "Nuts & Dry Fruits",
                "slug": "nuts-dry-fruits",
                "description": "Handpicked premium California almonds, rich cashews, succulent figs, and golden raisins sourced for freshness.",
                "image_url": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80",
                "display_order": 1
            },
            {
                "name": "Seeds & Spices",
                "slug": "seeds-spices",
                "description": "Authentic whole Indian spices and nutrient-dense raw edible seeds for daily wellness and rich culinary aroma.",
                "image_url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "display_order": 2
            },
            {
                "name": "Cold Pressed Oils",
                "slug": "cold-pressed-oils",
                "description": "Traditional wooden marachekku/ghani extracted unrefined oils. Free from chemicals, heat, or additives.",
                "image_url": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
                "display_order": 3
            },
            {
                "name": "Natural Jaggery Sweets",
                "slug": "natural-jaggery-sweets",
                "description": "Handmade traditional Telugu laddus and sunnundalu made with unrefined country bellam (natural jaggery) and pure ghee.",
                "image_url": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
                "display_order": 4
            }
        ]

        cat_objs = {}
        for c in categories_data:
            cat = Category(**c)
            db.add(cat)
            db.flush()
            cat_objs[c["slug"]] = cat

        # 4. Products Data (40 Items from reference poster)
        products_data = [
            # --- NUTS & DRY FRUITS (1 to 12) ---
            {
                "name": "Badam (Almonds)",
                "slug": "badam-almonds",
                "category_slug": "nuts-dry-fruits",
                "price": 240.0,
                "compare_at_price": 280.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 100,
                "sku": "VK-NUT-001",
                "is_featured": True,
                "short_description": "Crisp, naturally sweet California almonds carefully sorted for uniform size and crunch.",
                "description": "Our premium Badam (Almonds) are sourced directly from trusted harvests. Ideal for daily morning soaking, wholesome baking, making homemade badam milk, or a crunchy evening snack.",
                "ingredients": "100% Pure Whole Almonds (Badam). No additives, no preservatives.",
                "storage_info": "Store in an airtight container in a cool, dry place or refrigerate for maximum freshness.",
                "image": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 240.0, "compare_at_price": 280.0, "is_default": True},
                    {"weight_label": "500g", "price": 460.0, "compare_at_price": 540.0, "is_default": False},
                    {"weight_label": "1 kg", "price": 890.0, "compare_at_price": 1050.0, "is_default": False}
                ]
            },
            {
                "name": "Kaju (Cashews)",
                "slug": "kaju-cashews",
                "category_slug": "nuts-dry-fruits",
                "price": 260.0,
                "compare_at_price": 310.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 80,
                "sku": "VK-NUT-002",
                "is_featured": True,
                "short_description": "Wholesome, creamy whole cashew nuts (W240 grade) with rich natural sweetness.",
                "description": "Selected whole Kaju (Cashew nuts) that deliver exceptional buttery flavor. Perfect for traditional Indian sweets, festive kheer, biryanis, gravies, or light roasting.",
                "ingredients": "100% Pure Whole Cashew Nuts (Kaju).",
                "storage_info": "Store in an airtight dry jar away from heat and moisture.",
                "image": "https://images.unsplash.com/photo-1536591375315-1b8368903277?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 260.0, "compare_at_price": 310.0, "is_default": True},
                    {"weight_label": "500g", "price": 500.0, "compare_at_price": 600.0, "is_default": False},
                    {"weight_label": "1 kg", "price": 960.0, "compare_at_price": 1150.0, "is_default": False}
                ]
            },
            {
                "name": "Anjeer (Dried Figs)",
                "slug": "anjeer-dried-figs",
                "category_slug": "nuts-dry-fruits",
                "price": 290.0,
                "compare_at_price": 340.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 65,
                "sku": "VK-NUT-003",
                "is_featured": True,
                "short_description": "Naturally sun-dried sweet garland figs with pleasant crunch and rich fiber.",
                "description": "Hand-strung Anjeer (dried figs) dried naturally in sunshine without artificial sugar glazing. Soak overnight in water for optimal tenderness and morning nourishment.",
                "ingredients": "100% Natural Sun-Dried Figs (Anjeer).",
                "storage_info": "Keep tightly sealed in a cool, moisture-free space or refrigerator.",
                "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 290.0, "compare_at_price": 340.0, "is_default": True},
                    {"weight_label": "500g", "price": 560.0, "compare_at_price": 650.0, "is_default": False},
                    {"weight_label": "1 kg", "price": 1080.0, "compare_at_price": 1250.0, "is_default": False}
                ]
            },
            {
                "name": "Walnuts (Akhrot Kernels)",
                "slug": "walnuts-akhrot",
                "category_slug": "nuts-dry-fruits",
                "price": 320.0,
                "compare_at_price": 380.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 70,
                "sku": "VK-NUT-004",
                "is_featured": True,
                "short_description": "Light-colored walnut halves and kernels with fresh, earthy crunch.",
                "description": "Carefully shelled Akhrot (Walnuts) offering light, crisp kernels rich in natural oils. Excellent topping for oatmeal, morning dry fruit bowls, or salads.",
                "ingredients": "Raw Walnut Kernels (Akhrot).",
                "storage_info": "Refrigeration strongly recommended to preserve natural freshness and oils.",
                "image": "https://images.unsplash.com/photo-1589133469085-502a990a4be2?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 320.0, "compare_at_price": 380.0, "is_default": True},
                    {"weight_label": "500g", "price": 620.0, "compare_at_price": 720.0, "is_default": False},
                    {"weight_label": "1 kg", "price": 1190.0, "compare_at_price": 1390.0, "is_default": False}
                ]
            },
            {
                "name": "Pista (Pistachio Kernels)",
                "slug": "pista-kernels",
                "category_slug": "nuts-dry-fruits",
                "price": 340.0,
                "compare_at_price": 400.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 50,
                "sku": "VK-NUT-005",
                "is_featured": False,
                "short_description": "Raw shelled green pistachios ideal for garnishing and cooking.",
                "description": "Vibrant green shelled Pista kernels. Ideal for garnishing kheer, payasam, halwa, cookies, and traditional Indian sweet dishes.",
                "ingredients": "100% Shelled Raw Pistachio Kernels.",
                "storage_info": "Store in an airtight container in a cool spot.",
                "image": "https://images.unsplash.com/photo-1577003833174-a62cfc4323c8?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 340.0, "compare_at_price": 400.0, "is_default": True},
                    {"weight_label": "500g", "price": 660.0, "compare_at_price": 780.0, "is_default": False}
                ]
            },
            {
                "name": "Salted Pista (Roasted In-Shell)",
                "slug": "salted-pista",
                "category_slug": "nuts-dry-fruits",
                "price": 280.0,
                "compare_at_price": 330.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 90,
                "sku": "VK-NUT-006",
                "is_featured": False,
                "short_description": "Naturally opened roasted in-shell pistachios with a hint of salt.",
                "description": "Crisp and crunchy in-shell pistachios, gently dry roasted and lightly salted. A family favorite healthy snack for tea time and celebrations.",
                "ingredients": "In-shell Pistachios, Edible Common Salt.",
                "storage_info": "Keep in an airtight jar to preserve crispness.",
                "image": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 280.0, "compare_at_price": 330.0, "is_default": True},
                    {"weight_label": "500g", "price": 540.0, "compare_at_price": 640.0, "is_default": False},
                    {"weight_label": "1 kg", "price": 1040.0, "compare_at_price": 1200.0, "is_default": False}
                ]
            },
            {
                "name": "Kismis (Golden Raisins)",
                "slug": "kismis-golden-raisins",
                "category_slug": "nuts-dry-fruits",
                "price": 110.0,
                "compare_at_price": 135.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 110,
                "sku": "VK-NUT-007",
                "is_featured": False,
                "short_description": "Sweet, golden dried grapes with tender texture.",
                "description": "Sun-ripened golden Kismis offering natural sweetness. Essential for Telugu payasam, pongal, kesari, and daily children's tiffin boxes.",
                "ingredients": "Naturally Dried Seedless Grapes.",
                "storage_info": "Keep sealed in an airtight dry jar.",
                "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 110.0, "compare_at_price": 135.0, "is_default": True},
                    {"weight_label": "500g", "price": 210.0, "compare_at_price": 260.0, "is_default": False},
                    {"weight_label": "1 kg", "price": 400.0, "compare_at_price": 490.0, "is_default": False}
                ]
            },
            {
                "name": "White Munakka",
                "slug": "white-munakka",
                "category_slug": "nuts-dry-fruits",
                "price": 190.0,
                "compare_at_price": 230.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 60,
                "sku": "VK-NUT-008",
                "is_featured": False,
                "short_description": "Large seeded golden raisins traditionally favored for digestive wellness.",
                "description": "Traditional large seeded White Munakka (large dry grapes). Known in Ayurvedic household traditions for soaking overnight in water or warm milk.",
                "ingredients": "Large White Seeded Dried Grapes (Munakka).",
                "storage_info": "Store in a cool dry pantry container.",
                "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 190.0, "compare_at_price": 230.0, "is_default": True},
                    {"weight_label": "500g", "price": 360.0, "compare_at_price": 440.0, "is_default": False}
                ]
            },
            {
                "name": "Black Munakka",
                "slug": "black-munakka",
                "category_slug": "nuts-dry-fruits",
                "price": 210.0,
                "compare_at_price": 250.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 55,
                "sku": "VK-NUT-009",
                "is_featured": False,
                "short_description": "Jumbo dark seeded raisins deeply valued in Indian households.",
                "description": "Rich, fleshy Black Munakka with seeds intact. Soaked in water overnight for a revitalizing morning drink.",
                "ingredients": "100% Large Black Seeded Raisins.",
                "storage_info": "Keep sealed in an airtight jar in a cool place.",
                "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 210.0, "compare_at_price": 250.0, "is_default": True},
                    {"weight_label": "500g", "price": 400.0, "compare_at_price": 480.0, "is_default": False}
                ]
            },
            {
                "name": "Dry Dates (Kharik / Endu Karjura)",
                "slug": "dry-dates-kharik",
                "category_slug": "nuts-dry-fruits",
                "price": 95.0,
                "compare_at_price": 120.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 100,
                "sku": "VK-NUT-010",
                "is_featured": False,
                "short_description": "Firm golden-yellow dried dates, ideal for powdered dry date milk.",
                "description": "Hard-dried yellow dates (Endu Karjura / Chuara). Can be pounded and boiled in warm milk for traditional winter and monsoon nutrition.",
                "ingredients": "100% Whole Dried Dates.",
                "storage_info": "Store in a dry airtight container.",
                "image": "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 95.0, "compare_at_price": 120.0, "is_default": True},
                    {"weight_label": "500g", "price": 180.0, "compare_at_price": 230.0, "is_default": False},
                    {"weight_label": "1 kg", "price": 340.0, "compare_at_price": 420.0, "is_default": False}
                ]
            },
            {
                "name": "Kimia Dates",
                "slug": "kimia-dates",
                "category_slug": "nuts-dry-fruits",
                "price": 220.0,
                "compare_at_price": 260.0,
                "weight": "500g",
                "unit": "gm",
                "stock": 85,
                "sku": "VK-NUT-011",
                "is_featured": False,
                "short_description": "Soft, melt-in-the-mouth black Mazafati dates in protective box pack.",
                "description": "Fresh and moist Kimia dates celebrated for their silky texture and caramel-like richness. Sourced from the finest date palms.",
                "ingredients": "Fresh Kimia / Mazafati Dates.",
                "storage_info": "Keep in refrigerator to maintain soft texture and moisture.",
                "image": "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "500g Box", "price": 220.0, "compare_at_price": 260.0, "is_default": True},
                    {"weight_label": "1 kg (2 Boxes)", "price": 420.0, "compare_at_price": 500.0, "is_default": False}
                ]
            },
            {
                "name": "Seedless Dates",
                "slug": "seedless-dates",
                "category_slug": "nuts-dry-fruits",
                "price": 140.0,
                "compare_at_price": 170.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 95,
                "sku": "VK-NUT-012",
                "is_featured": False,
                "short_description": "Clean, pitted dates ready to eat or blend directly into shakes.",
                "description": "Hygienically de-seeded sweet dates. Ready for immediate snacking, energy balls, natural jaggery sweet making, or milkshakes.",
                "ingredients": "Pitted Dates (Seedless).",
                "storage_info": "Store in an airtight container.",
                "image": "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 140.0, "compare_at_price": 170.0, "is_default": True},
                    {"weight_label": "500g", "price": 260.0, "compare_at_price": 320.0, "is_default": False}
                ]
            },

            # --- SEEDS & SPICES (13 to 31) ---
            {
                "name": "Pumpkin Seeds (Pepitas)",
                "slug": "pumpkin-seeds",
                "category_slug": "seeds-spices",
                "price": 180.0,
                "compare_at_price": 220.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 75,
                "sku": "VK-SED-013",
                "is_featured": False,
                "short_description": "Raw shelled green pumpkin seeds rich in zinc and magnesium.",
                "description": "Wholesome raw pepitas carefully cleaned. Delicious when lightly pan-toasted with a pinch of rock salt or sprinkled over morning yogurt.",
                "ingredients": "100% Raw Shelled Pumpkin Seeds.",
                "storage_info": "Store in a cool dry container.",
                "image": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 180.0, "compare_at_price": 220.0, "is_default": True},
                    {"weight_label": "500g", "price": 340.0, "compare_at_price": 410.0, "is_default": False}
                ]
            },
            {
                "name": "Sunflower Seeds",
                "slug": "sunflower-seeds",
                "category_slug": "seeds-spices",
                "price": 120.0,
                "compare_at_price": 150.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 70,
                "sku": "VK-SED-014",
                "is_featured": False,
                "short_description": "Clean, hulled raw sunflower kernels with mild nutty flavor.",
                "description": "Mild and nutty sunflower seeds. Add crunch to rotis, granolas, bakery breads, or enjoy roasted.",
                "ingredients": "100% Hulled Sunflower Seeds.",
                "storage_info": "Keep in an airtight jar in a cool pantry.",
                "image": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 120.0, "compare_at_price": 150.0, "is_default": True},
                    {"weight_label": "500g", "price": 230.0, "compare_at_price": 280.0, "is_default": False}
                ]
            },
            {
                "name": "Watermelon Seeds (Magaj)",
                "slug": "watermelon-seeds-magaj",
                "category_slug": "seeds-spices",
                "price": 130.0,
                "compare_at_price": 160.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 60,
                "sku": "VK-SED-015",
                "is_featured": False,
                "short_description": "Shelled melon kernels indispensable for creamy royal curries and mithai.",
                "description": "Carefully hulled white watermelon seeds (Magaj). Used in traditional Indian cooking to create velvety shahi gravies and sweets.",
                "ingredients": "Raw Hulled Watermelon Kernels (Tarbuj Beej).",
                "storage_info": "Store in a cool dry container.",
                "image": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 130.0, "compare_at_price": 160.0, "is_default": True},
                    {"weight_label": "500g", "price": 240.0, "compare_at_price": 300.0, "is_default": False}
                ]
            },
            {
                "name": "Chia Seeds",
                "slug": "chia-seeds",
                "category_slug": "seeds-spices",
                "price": 150.0,
                "compare_at_price": 180.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 80,
                "sku": "VK-SED-016",
                "is_featured": True,
                "short_description": "High-purity raw chia seeds that swell effortlessly in fluids.",
                "description": "Premium black and grey chia seeds. Soak in water, lemon drinks, tender coconut water, or buttermilk for a cooling, fiber-rich hydration boost.",
                "ingredients": "100% Whole Chia Seeds (Salvia Hispanica).",
                "storage_info": "Store in an airtight jar away from humidity.",
                "image": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 150.0, "compare_at_price": 180.0, "is_default": True},
                    {"weight_label": "500g", "price": 280.0, "compare_at_price": 340.0, "is_default": False}
                ]
            },
            {
                "name": "Sabja Seeds (Sweet Basil Seeds)",
                "slug": "sabja-seeds",
                "category_slug": "seeds-spices",
                "price": 90.0,
                "compare_at_price": 110.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 90,
                "sku": "VK-SED-017",
                "is_featured": False,
                "short_description": "Traditional cooling sweet basil seeds for sherbets, nannari, and falooda.",
                "description": "Pure cleaned Sabja seeds that rapidly swell into a translucent gel in seconds. Traditional Indian natural body cooler.",
                "ingredients": "100% Pure Basil Seeds (Sabja).",
                "storage_info": "Keep sealed in dry conditions.",
                "image": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 90.0, "compare_at_price": 110.0, "is_default": True},
                    {"weight_label": "500g", "price": 170.0, "compare_at_price": 210.0, "is_default": False}
                ]
            },
            {
                "name": "Flax Seeds (Alsi / Avise Ginjalu)",
                "slug": "flax-seeds",
                "category_slug": "seeds-spices",
                "price": 75.0,
                "compare_at_price": 95.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 85,
                "sku": "VK-SED-018",
                "is_featured": False,
                "short_description": "Cleaned whole brown flax seeds, perfect for podi and laddus.",
                "description": "Glossy brown flax seeds (Avise ginjalu). Dry roast lightly and powder for making nutritious Andhra karam podi, chutneys, or adding to dough.",
                "ingredients": "100% Brown Flax Seeds.",
                "storage_info": "Keep in an airtight jar in a cool dark pantry.",
                "image": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 75.0, "compare_at_price": 95.0, "is_default": True},
                    {"weight_label": "500g", "price": 140.0, "compare_at_price": 180.0, "is_default": False}
                ]
            },
            {
                "name": "Nuvvulu (White Sesame Seeds)",
                "slug": "nuvvulu-sesame-seeds",
                "category_slug": "seeds-spices",
                "price": 85.0,
                "compare_at_price": 105.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 100,
                "sku": "VK-SED-019",
                "is_featured": False,
                "short_description": "Cleaned pearly white sesame seeds with fragrant nutty aroma.",
                "description": "Double-cleaned white sesame seeds (Nuvvulu / Til). Essential for Telugu festive delicacies, nuvvula podi, chikki, and thalimpu (tadka).",
                "ingredients": "Cleaned White Sesame Seeds.",
                "storage_info": "Store in an airtight container.",
                "image": "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 85.0, "compare_at_price": 105.0, "is_default": True},
                    {"weight_label": "500g", "price": 160.0, "compare_at_price": 200.0, "is_default": False}
                ]
            },
            {
                "name": "Dhaniyalu (Coriander Seeds)",
                "slug": "dhaniyalu-coriander-seeds",
                "category_slug": "seeds-spices",
                "price": 60.0,
                "compare_at_price": 75.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 90,
                "sku": "VK-SPI-020",
                "is_featured": False,
                "short_description": "Aromatic whole coriander seeds with citrusy, herbal fragrance.",
                "description": "Sun-dried whole Dhaniyalu from the freshest harvests. Hand-ground for sambar powder, rasam powder, and traditional Indian curries.",
                "ingredients": "100% Whole Coriander Seeds.",
                "storage_info": "Store in an airtight container away from direct sunlight.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 60.0, "compare_at_price": 75.0, "is_default": True},
                    {"weight_label": "500g", "price": 115.0, "compare_at_price": 140.0, "is_default": False}
                ]
            },
            {
                "name": "Jeera (Whole Cumin Seeds)",
                "slug": "jeera-cumin-seeds",
                "category_slug": "seeds-spices",
                "price": 140.0,
                "compare_at_price": 170.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 95,
                "sku": "VK-SPI-021",
                "is_featured": True,
                "short_description": "High-essential-oil fragrant cumin seeds with distinctive warm aroma.",
                "description": "Selected clean Jeera seeds. The foundational spice for Indian tadka, jeera rice, dal fry, and chaas.",
                "ingredients": "100% Whole Cumin Seeds (Jeera).",
                "storage_info": "Keep sealed in a cool, dry place.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 140.0, "compare_at_price": 170.0, "is_default": True},
                    {"weight_label": "500g", "price": 270.0, "compare_at_price": 330.0, "is_default": False}
                ]
            },
            {
                "name": "Lavangalu (Whole Cloves)",
                "slug": "lavangalu-cloves",
                "category_slug": "seeds-spices",
                "price": 160.0,
                "compare_at_price": 195.0,
                "weight": "100g",
                "unit": "gm",
                "stock": 70,
                "sku": "VK-SPI-022",
                "is_featured": False,
                "short_description": "Hand-picked whole aromatic cloves with crowned buds and strong punch.",
                "description": "Rich, whole Lavangalu packed with natural essential clove oil. Brings warm depth to Hyderabadi biryani, garam masala, and spiced chai.",
                "ingredients": "100% Whole Cloves (Laung).",
                "storage_info": "Store in an airtight spice container.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "100g", "price": 160.0, "compare_at_price": 195.0, "is_default": True},
                    {"weight_label": "250g", "price": 380.0, "compare_at_price": 450.0, "is_default": False}
                ]
            },
            {
                "name": "Dalchina Chekka (Cinnamon Bark)",
                "slug": "dalchina-chekka-cinnamon",
                "category_slug": "seeds-spices",
                "price": 110.0,
                "compare_at_price": 135.0,
                "weight": "100g",
                "unit": "gm",
                "stock": 80,
                "sku": "VK-SPI-023",
                "is_featured": False,
                "short_description": "Sweet aromatic cinnamon rolls and bark for rich masalas and tea.",
                "description": "Naturally fragrant Dalchina Chekka (cinnamon bark). Adds authentic woody sweetness to biryanis, curries, and warm infusions.",
                "ingredients": "Whole Cinnamon Bark.",
                "storage_info": "Keep in an airtight jar away from moisture.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "100g", "price": 110.0, "compare_at_price": 135.0, "is_default": True},
                    {"weight_label": "250g", "price": 250.0, "compare_at_price": 310.0, "is_default": False}
                ]
            },
            {
                "name": "Japathri (Mace / Javitri)",
                "slug": "japathri-mace",
                "category_slug": "seeds-spices",
                "price": 280.0,
                "compare_at_price": 340.0,
                "weight": "50g",
                "unit": "gm",
                "stock": 50,
                "sku": "VK-SPI-024",
                "is_featured": False,
                "short_description": "Golden lace-like mace blades with delicate spicy floral aroma.",
                "description": "Whole dried Japathri (mace flower). The signature regal spice for Nizami biryanis, kormas, and royal spice blends.",
                "ingredients": "100% Whole Dried Mace Blades (Japathri).",
                "storage_info": "Store in a dry airtight container.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "50g", "price": 280.0, "compare_at_price": 340.0, "is_default": True},
                    {"weight_label": "100g", "price": 530.0, "compare_at_price": 640.0, "is_default": False}
                ]
            },
            {
                "name": "Elachi (Green Cardamom)",
                "slug": "elachi-green-cardamom",
                "category_slug": "seeds-spices",
                "price": 360.0,
                "compare_at_price": 430.0,
                "weight": "100g",
                "unit": "gm",
                "stock": 65,
                "sku": "VK-SPI-025",
                "is_featured": True,
                "short_description": "8mm bold plump green cardamom pods bursting with fragrance.",
                "description": "Imperial quality green Elachi (cardamom pods). Packed with aromatic dark seeds that perfume chai, payasam, laddus, and festive desserts.",
                "ingredients": "100% Whole Green Cardamom Pods (Elachi).",
                "storage_info": "Store in an airtight container to preserve volatile essential oils.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "50g", "price": 190.0, "compare_at_price": 230.0, "is_default": False},
                    {"weight_label": "100g", "price": 360.0, "compare_at_price": 430.0, "is_default": True},
                    {"weight_label": "250g", "price": 860.0, "compare_at_price": 1020.0, "is_default": False}
                ]
            },
            {
                "name": "Marati Mogga (Kapok Buds)",
                "slug": "marati-mogga",
                "category_slug": "seeds-spices",
                "price": 110.0,
                "compare_at_price": 140.0,
                "weight": "100g",
                "unit": "gm",
                "stock": 60,
                "sku": "VK-SPI-026",
                "is_featured": False,
                "short_description": "Distinctive South Indian Kapok buds for Hyderabadi and Chettinad biryanis.",
                "description": "Authentic Marati Mogga dried buds. Imparts an earthy, warm piquancy that sets South Indian pulaos and biryanis apart.",
                "ingredients": "100% Whole Dried Kapok Buds (Marati Mogga).",
                "storage_info": "Store in a dry airtight jar.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "100g", "price": 110.0, "compare_at_price": 140.0, "is_default": True},
                    {"weight_label": "250g", "price": 250.0, "compare_at_price": 320.0, "is_default": False}
                ]
            },
            {
                "name": "Shadjeera (Caraway / Black Cumin)",
                "slug": "shadjeera-black-cumin",
                "category_slug": "seeds-spices",
                "price": 120.0,
                "compare_at_price": 150.0,
                "weight": "100g",
                "unit": "gm",
                "stock": 60,
                "sku": "VK-SPI-027",
                "is_featured": False,
                "short_description": "Royal aromatic caraway seeds for gourmet pulao and Shahi korma.",
                "description": "Delicate, needle-like Shadjeera seeds featuring sweet licorice and anise notes. Essential for Shahi gravies and biryani seasoning.",
                "ingredients": "100% Whole Shahjeera (Caraway Seeds).",
                "storage_info": "Keep sealed tightly in dry place.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "100g", "price": 120.0, "compare_at_price": 150.0, "is_default": True},
                    {"weight_label": "250g", "price": 280.0, "compare_at_price": 340.0, "is_default": False}
                ]
            },
            {
                "name": "Biryani Leaf (Tej Patta / Bay Leaf)",
                "slug": "biryani-leaf-bay-leaf",
                "category_slug": "seeds-spices",
                "price": 50.0,
                "compare_at_price": 65.0,
                "weight": "50g",
                "unit": "gm",
                "stock": 90,
                "sku": "VK-SPI-028",
                "is_featured": False,
                "short_description": "Cleaned whole dried bay leaves packed with herbal aroma.",
                "description": "Fragrant Indian Bay Leaves (Biryani Aaku / Tej Patta). Simmer in rice dishes, curries, and soups for deep aromatic undertones.",
                "ingredients": "100% Whole Dried Bay Leaves.",
                "storage_info": "Store in a cool dry space.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "50g", "price": 50.0, "compare_at_price": 65.0, "is_default": True},
                    {"weight_label": "100g", "price": 90.0, "compare_at_price": 120.0, "is_default": False}
                ]
            },
            {
                "name": "Menthulu (Fenugreek Seeds)",
                "slug": "menthulu-fenugreek-seeds",
                "category_slug": "seeds-spices",
                "price": 40.0,
                "compare_at_price": 50.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 90,
                "sku": "VK-SPI-029",
                "is_featured": False,
                "short_description": "Golden whole fenugreek seeds with pleasant bittersweet flavor.",
                "description": "Whole Menthulu (methi seeds). Essential in Telugu pickles (Avakaya), dosas, rasam, and traditional spice tempering.",
                "ingredients": "100% Whole Fenugreek Seeds.",
                "storage_info": "Keep sealed in a dry container.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 40.0, "compare_at_price": 50.0, "is_default": True},
                    {"weight_label": "500g", "price": 75.0, "compare_at_price": 95.0, "is_default": False}
                ]
            },
            {
                "name": "Aavalu (Mustard Seeds)",
                "slug": "aavalu-mustard-seeds",
                "category_slug": "seeds-spices",
                "price": 45.0,
                "compare_at_price": 55.0,
                "weight": "250g",
                "unit": "gm",
                "stock": 90,
                "sku": "VK-SPI-030",
                "is_featured": False,
                "short_description": "Tiny pungent black mustard seeds that crackle in hot oil.",
                "description": "Traditional small black mustard seeds (Aavalu). The quintessential South Indian tadka spice that gives chutneys and curries their zesty soul.",
                "ingredients": "100% Whole Black Mustard Seeds.",
                "storage_info": "Store in an airtight spice container.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g", "price": 45.0, "compare_at_price": 55.0, "is_default": True},
                    {"weight_label": "500g", "price": 85.0, "compare_at_price": 105.0, "is_default": False}
                ]
            },
            {
                "name": "Anasapuvvu (Star Anise)",
                "slug": "anasapuvvu-star-anise",
                "category_slug": "seeds-spices",
                "price": 95.0,
                "compare_at_price": 120.0,
                "weight": "50g",
                "unit": "gm",
                "stock": 70,
                "sku": "VK-SPI-031",
                "is_featured": False,
                "short_description": "Whole eight-pointed star anise flowers with sweet pungent aroma.",
                "description": "Beautiful whole Anasapuvvu (Chakra Phool). Adds sweet aromatic warmth to broths, rice, and traditional garam masalas.",
                "ingredients": "100% Whole Star Anise (Chakra Phool).",
                "storage_info": "Keep in an airtight jar in a cool place.",
                "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "50g", "price": 95.0, "compare_at_price": 120.0, "is_default": True},
                    {"weight_label": "100g", "price": 180.0, "compare_at_price": 220.0, "is_default": False}
                ]
            },

            # --- COLD PRESSED OILS (32 to 34) ---
            {
                "name": "Palli Cold Pressed Oil (Groundnut Oil)",
                "slug": "palli-cold-pressed-oil",
                "category_slug": "cold-pressed-oils",
                "price": 290.0,
                "compare_at_price": 340.0,
                "weight": "1 Litre",
                "unit": "L",
                "stock": 50,
                "sku": "VK-OIL-032",
                "is_featured": True,
                "short_description": "Traditional wooden marachekku pressed pure groundnut oil with authentic roasted peanut aroma.",
                "description": "Our Palli (Groundnut) Cold Pressed Oil is extracted using traditional slow wooden presses without artificial heat, solvent extraction, or chemical refining. Retains natural antioxidants, authentic nutty taste, and cooking clarity.",
                "ingredients": "100% Pure Wood-Pressed Groundnut (Peanut) Oil. No chemicals, no preservatives, no blending.",
                "storage_info": "Store in a cool dry place away from direct sunlight. Natural sedimentation is a mark of raw purity.",
                "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "500 ml", "price": 155.0, "compare_at_price": 180.0, "is_default": False},
                    {"weight_label": "1 Litre", "price": 290.0, "compare_at_price": 340.0, "is_default": True},
                    {"weight_label": "5 Litres Can", "price": 1400.0, "compare_at_price": 1650.0, "is_default": False}
                ]
            },
            {
                "name": "Sesame Cold Pressed Oil (Gingelly / Nuvvula Nune)",
                "slug": "sesame-cold-pressed-oil",
                "category_slug": "cold-pressed-oils",
                "price": 380.0,
                "compare_at_price": 440.0,
                "weight": "1 Litre",
                "unit": "L",
                "stock": 40,
                "sku": "VK-OIL-033",
                "is_featured": True,
                "short_description": "Unrefined wood-pressed sesame oil with touch of traditional jaggery during pressing.",
                "description": "Pure Nuvvula Nune (Sesame oil) cold-pressed in wooden ghani. In Andhra tradition, natural jaggery is added during seed pressing to tame bitterness, resulting in an aromatic, golden culinary elixir.",
                "ingredients": "100% Pure Cold-Pressed Sesame Seeds, Trace Natural Jaggery.",
                "storage_info": "Store in an airtight bottle away from direct heat and sunlight.",
                "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "500 ml", "price": 200.0, "compare_at_price": 230.0, "is_default": False},
                    {"weight_label": "1 Litre", "price": 380.0, "compare_at_price": 440.0, "is_default": True}
                ]
            },
            {
                "name": "Coconut Cold Pressed Oil (Kobbari Nune)",
                "slug": "coconut-cold-pressed-oil",
                "category_slug": "cold-pressed-oils",
                "price": 360.0,
                "compare_at_price": 420.0,
                "weight": "1 Litre",
                "unit": "L",
                "stock": 45,
                "sku": "VK-OIL-034",
                "is_featured": True,
                "short_description": "Pure virgin cold-pressed oil extracted from sun-dried copra.",
                "description": "Traditional wood-pressed Kobbari Nune extracted from carefully selected sun-dried coconut copra. Free from bleaching agents and artificial fragrances.",
                "ingredients": "100% Pure Wood-Pressed Coconut Oil.",
                "storage_info": "Solidifies naturally in cooler temperatures below 24°C. Place bottle in warm water to liquefy.",
                "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "500 ml", "price": 190.0, "compare_at_price": 220.0, "is_default": False},
                    {"weight_label": "1 Litre", "price": 360.0, "compare_at_price": 420.0, "is_default": True}
                ]
            },

            # --- NATURAL JAGGERY SWEETS (35 to 40) ---
            {
                "name": "Jowar Laddu (Sorghum Millet Laddu)",
                "slug": "jowar-laddu",
                "category_slug": "natural-jaggery-sweets",
                "price": 190.0,
                "compare_at_price": 230.0,
                "weight": "250g (6 pcs)",
                "unit": "gm",
                "stock": 40,
                "sku": "VK-SWT-035",
                "is_featured": True,
                "short_description": "Wholesome roasted jowar flour laddus bound with chemical-free country jaggery and pure ghee.",
                "description": "Made fresh using traditional Telangana recipes. Slow-roasted sorghum (jowar) flour combined with pure bellam (natural jaggery) and aromatic cardamom. Completely free from refined white sugar.",
                "ingredients": "Jowar (Sorghum) Flour, Natural Country Jaggery, Pure Cow Ghee, Cardamom (Elachi).",
                "storage_info": "Store in an airtight container. Consume within 21 days for best flavor.",
                "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g (6 pcs)", "price": 190.0, "compare_at_price": 230.0, "is_default": True},
                    {"weight_label": "500g (12 pcs)", "price": 360.0, "compare_at_price": 440.0, "is_default": False},
                    {"weight_label": "1 kg (24 pcs)", "price": 700.0, "compare_at_price": 850.0, "is_default": False}
                ]
            },
            {
                "name": "Ragi Laddu (Finger Millet Laddu)",
                "slug": "ragi-laddu",
                "category_slug": "natural-jaggery-sweets",
                "price": 190.0,
                "compare_at_price": 230.0,
                "weight": "250g (6 pcs)",
                "unit": "gm",
                "stock": 40,
                "sku": "VK-SWT-036",
                "is_featured": True,
                "short_description": "Nutrient-rich finger millet laddus prepared with natural jaggery and roasted nuts.",
                "description": "Slowly roasted ragi flour hand-rolled with organic country jaggery, pure ghee, and roasted cashew slivers. A nutritious everyday traditional sweet for children and elders alike.",
                "ingredients": "Ragi (Finger Millet) Flour, Natural Jaggery, Pure Ghee, Kaju slivers, Cardamom.",
                "storage_info": "Store in an airtight container away from moisture.",
                "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g (6 pcs)", "price": 190.0, "compare_at_price": 230.0, "is_default": True},
                    {"weight_label": "500g (12 pcs)", "price": 360.0, "compare_at_price": 440.0, "is_default": False},
                    {"weight_label": "1 kg (24 pcs)", "price": 700.0, "compare_at_price": 850.0, "is_default": False}
                ]
            },
            {
                "name": "Nuvvula Laddu (Sesame Jaggery Laddu / Til Laddu)",
                "slug": "nuvvula-laddu",
                "category_slug": "natural-jaggery-sweets",
                "price": 180.0,
                "compare_at_price": 220.0,
                "weight": "250g (6 pcs)",
                "unit": "gm",
                "stock": 50,
                "sku": "VK-SWT-037",
                "is_featured": True,
                "short_description": "Crunchy roasted white and black sesame seeds bound with unrefined jaggery syrup.",
                "description": "Authentic Andhra Nuvvula Undalu (Sesame laddus). Roasted until fragrant and rolled in hot country jaggery syrup. Rich in natural calcium and warmth.",
                "ingredients": "Roasted Sesame Seeds (Nuvvulu), Pure Natural Bellam (Jaggery), Cardamom.",
                "storage_info": "Keep in an airtight container in a dry place. Shelf life: 30 days.",
                "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g (6 pcs)", "price": 180.0, "compare_at_price": 220.0, "is_default": True},
                    {"weight_label": "500g (12 pcs)", "price": 340.0, "compare_at_price": 420.0, "is_default": False},
                    {"weight_label": "1 kg (24 pcs)", "price": 660.0, "compare_at_price": 800.0, "is_default": False}
                ]
            },
            {
                "name": "Sunnundalu (Urad Dal Jaggery Laddu)",
                "slug": "sunnundalu-bellam",
                "category_slug": "natural-jaggery-sweets",
                "price": 220.0,
                "compare_at_price": 270.0,
                "weight": "250g (6 pcs)",
                "unit": "gm",
                "stock": 45,
                "sku": "VK-SWT-038",
                "is_featured": True,
                "short_description": "The pride of Telugu households - slow-roasted urad dal, natural bellam, and generous pure desi ghee.",
                "description": "Authentic Andhra Bellam Sunnundalu. Whole black gram roasted slowly to a golden brown perfection, powdered, and rolled by hand with grated natural bellam and melted desi cow ghee.",
                "ingredients": "Roasted Minapappu (Urad Dal), Pure Country Bellam (Jaggery), Desi Cow Ghee.",
                "storage_info": "Store in an airtight container at room temperature. Best consumed within 25 days.",
                "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g (6 pcs)", "price": 220.0, "compare_at_price": 270.0, "is_default": True},
                    {"weight_label": "500g (12 pcs)", "price": 420.0, "compare_at_price": 520.0, "is_default": False},
                    {"weight_label": "1 kg (24 pcs)", "price": 820.0, "compare_at_price": 1000.0, "is_default": False}
                ]
            },
            {
                "name": "Flax Seed Laddu (Avise Ginjala Laddu)",
                "slug": "flax-seed-laddu",
                "category_slug": "natural-jaggery-sweets",
                "price": 190.0,
                "compare_at_price": 230.0,
                "weight": "250g (6 pcs)",
                "unit": "gm",
                "stock": 35,
                "sku": "VK-SWT-039",
                "is_featured": False,
                "short_description": "Nutty roasted flax seeds combined with natural jaggery and pure ghee.",
                "description": "Wholesome Avise Ginjalu (flax seeds) roasted and hand-crafted with country jaggery. A delicious, traditional way to include flax seeds in the family diet.",
                "ingredients": "Roasted Flax Seeds (Avise Ginjalu), Natural Jaggery, Pure Ghee, Dry Ginger (Sonti), Cardamom.",
                "storage_info": "Store in an airtight jar in a cool pantry.",
                "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g (6 pcs)", "price": 190.0, "compare_at_price": 230.0, "is_default": True},
                    {"weight_label": "500g (12 pcs)", "price": 360.0, "compare_at_price": 440.0, "is_default": False}
                ]
            },
            {
                "name": "Korra Laddu (Foxtail Millet Laddu)",
                "slug": "korra-laddu",
                "category_slug": "natural-jaggery-sweets",
                "price": 190.0,
                "compare_at_price": 230.0,
                "weight": "250g (6 pcs)",
                "unit": "gm",
                "stock": 35,
                "sku": "VK-SWT-040",
                "is_featured": False,
                "short_description": "Ancient foxtail millet flour rolled with country jaggery and fragrant ghee.",
                "description": "Handcrafted Korra (foxtail millet) laddu prepared according to age-old village recipes. No refined sugars, only pure natural jaggery and slow-roasted grains.",
                "ingredients": "Foxtail Millet (Korra) Flour, Pure Natural Jaggery, Desi Ghee, Cardamom.",
                "storage_info": "Store in an airtight container.",
                "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
                "variants": [
                    {"weight_label": "250g (6 pcs)", "price": 190.0, "compare_at_price": 230.0, "is_default": True},
                    {"weight_label": "500g (12 pcs)", "price": 360.0, "compare_at_price": 440.0, "is_default": False}
                ]
            }
        ]

        # Insert products and their variants
        for p_data in products_data:
            cat = cat_objs.get(p_data["category_slug"])
            if not cat:
                continue

            variants_data = p_data.pop("variants", [])
            category_slug = p_data.pop("category_slug")

            product = Product(
                category_id=cat.id,
                gallery=json.dumps([p_data["image"]]),
                **p_data
            )
            db.add(product)
            db.flush()

            # Add variants
            for v_data in variants_data:
                variant = ProductVariant(
                    product_id=product.id,
                    **v_data
                )
                db.add(variant)

        db.commit()
        print(f"Successfully seeded {len(products_data)} products and default store settings!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
