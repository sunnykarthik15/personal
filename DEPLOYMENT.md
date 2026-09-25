# Production Deployment Guide: Vaishno Karthik Web Application

This document provides step-by-step instructions for deploying the **VAISHNO KARTHIK DRY FRUITS, SPICES & COLD PRESSED OILS** e-commerce system to public production infrastructure.

---

## Architecture Overview

```mermaid
graph TD
    Client[Customer Browser] -->|HTTPS| CDN[Vercel Edge / Cloudflare]
    CDN -->|Static Assets| Frontend[React + TypeScript + Tailwind]
    Frontend -->|REST API over HTTPS| Backend[FastAPI on Render / Railway]
    Backend -->|PostgreSQL Connection Pool| DB[(Supabase PostgreSQL)]
    Backend -->|Product Images| Storage[Supabase Storage Bucket]
    Frontend -->|WhatsApp Order Trigger| WhatsApp[Customer & Store WhatsApp 9848856787]
```

---

## STEP 1: Create GitHub Repository

1. Initialize git in the project root:
   ```bash
   git init
   git add .
   git commit -m "feat: initial production-ready Vaishno Karthik web application"
   ```
2. Create a new private or public repository on GitHub (e.g., `vaishno-karthik-store`).
3. Add the remote and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/vaishno-karthik-store.git
   git branch -M main
   git push -u origin main
   ```
   > **Security Check**: Verify that `.env`, `.env.local`, `venv`, and `node_modules` are ignored and never pushed.

---

## STEP 2: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and log in.
2. Click **New Project**.
3. Choose your Organization, set Project Name (e.g. `vaishno-karthik-db`), select a strong database password, and select your region (e.g. `ap-south-1` Mumbai for Indian audience speed).
4. Wait for database provisioning to complete (typically ~1-2 minutes).

---

## STEP 3: Create PostgreSQL Database & Connection String

1. In Supabase Dashboard, navigate to **Project Settings** → **Database**.
2. Under **Connection string**, select **URI**.
3. Copy the URI. It looks like:
   ```text
   postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   ```
   *(Note: The backend code automatically normalizes `postgres://` to `postgresql://` and enables connection pooling).*

---

## STEP 4: Create Supabase Storage Bucket

1. In Supabase Dashboard, navigate to **Storage** → **Buckets**.
2. Click **New Bucket**.
3. Name the bucket `product-images`.
4. Turn **Public bucket** ON so product images can be delivered via Supabase CDN.
5. In **Project Settings** → **API**, note your:
   - `Project URL` (e.g., `https://xyzcompany.supabase.co`)
   - `anon public` key
   - `service_role secret` key (keep private!)

---

## STEP 5: Configure Backend Environment Variables

Prepare your environment values:

```env
PROJECT_NAME="VAISHNO KARTHIK DRY FRUITS, SPICES & COLD PRESSED OILS"
ENVIRONMENT="production"
DATABASE_URL="postgresql://postgres.[ref]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
JWT_SECRET="<generate-a-secure-64-character-random-hex-string>"
CORS_ORIGINS="https://vaishnokarthik.com,https://vaishnokarthik.in,https://vaishno-karthik.vercel.app"
PRIMARY_PHONE="9848856787"
SECONDARY_PHONE="9642145789"
WHATSAPP_NUMBER="9848856787"
ADMIN_EMAIL="admin@vaishnokarthik.com"
ADMIN_PASSWORD="<Your-Chosen-Secure-Password>"
SUPABASE_URL="https://[ref].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<your-service-role-key>"
SUPABASE_STORAGE_BUCKET="product-images"
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
```

---

## STEP 6: Deploy FastAPI Backend (Render / Railway / Fly.io)

### Option A: Render (Recommended for FastAPI)
1. Go to [https://render.com](https://render.com) and create an account.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Configure settings:
   - **Name**: `vaishno-karthik-api`
   - **Root Directory**: `backend` (or leave blank if using root with module syntax)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt && python backend/migrate.py`
   - **Start Command**: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
5. Under **Environment Variables**, paste all backend variables from Step 5.
6. Click **Create Web Service**.
7. Note your public backend URL: `https://vaishno-karthik-api.onrender.com`.

### Option B: Railway
1. Go to [https://railway.app](https://railway.app) and create a project from your GitHub repo.
2. In service settings, set Build Command to `pip install -r backend/requirements.txt && python backend/migrate.py`.
3. Set Start Command to `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`.
4. Add environment variables.

---

## STEP 7: Deploy React Frontend (Vercel / Netlify)

### Option A: Vercel (Recommended for Vite + React)
1. Go to [https://vercel.com](https://vercel.com) and click **Add New...** → **Project**.
2. Import your GitHub repository.
3. In **Configure Project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   ```env
   VITE_API_URL=https://vaishno-karthik-api.onrender.com/api
   VITE_STORE_NAME=VAISHNO KARTHIK DRY FRUITS, SPICES & COLD PRESSED OILS
   VITE_WHATSAPP_NUMBER=9848856787
   ```
5. Click **Deploy**.
6. Your frontend is live at `https://vaishno-karthik.vercel.app`!

---

## STEP 8: Connect Frontend to Backend & Configure Production CORS

1. Return to your Render/Railway backend environment settings.
2. Update `CORS_ORIGINS` to include your newly deployed Vercel domain:
   ```env
   CORS_ORIGINS=https://vaishno-karthik.vercel.app,https://vaishnokarthik.com
   ```
3. Trigger a redeploy of the backend service so the CORS whitelist is updated.

---

## STEP 9: Connect Custom Domain

1. In Vercel Project Settings, navigate to **Domains**.
2. Enter your custom domain (e.g., `vaishnokarthik.com` or `www.vaishnokarthik.com`).
3. Vercel will provide DNS records:
   - **A Record**: Point `@` to `76.76.21.21`
   - **CNAME Record**: Point `www` to `cname.vercel-dns.com`
4. Log into your domain registrar (GoDaddy, Namecheap, Hostinger, Google Domains) and add these DNS records.

---

## STEP 10: Enable Automatic HTTPS

- Vercel and Render automatically provision and renew **Let's Encrypt SSL/TLS certificates** once DNS propagation completes (usually within 10–30 minutes).
- Both platforms force HTTP-to-HTTPS redirection by default.

---

## STEP 11: Production Smoke Tests

Once deployed, run through this quick checklist on your live public domain:
1. **Health Check**: Open `https://api.yourdomain.com/health` → Expect `{"status": "healthy"}`.
2. **Homepage**: Visit `https://yourdomain.com/`. Verify hero, 4 trust cards, categories, cold-pressed oils spotlight, and natural jaggery sweets.
3. **Product Catalog**: Open Shop page, test search, filters, and pack size selectors.
4. **Order Flow**: Add an item to cart, proceed to checkout, enter customer details, and submit order.
5. **WhatsApp Ordering**: Click "Order on WhatsApp" and verify the message text populates correctly.
6. **Admin Dashboard**: Sign in at `/` using your `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Check KPIs and order updates.

---

## STEP 12: Submit Website to Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add your property (e.g. `https://vaishnokarthik.com`).
3. Verify ownership via DNS TXT record or HTML tag provided by Google.
4. In the left menu, click **Sitemaps**.
5. Submit `https://vaishnokarthik.com/sitemap.xml`.
6. Use the **URL Inspection** tool to inspect the homepage and request indexing.

---

## STEP 13: Configure Google Analytics (Optional)

1. Create a GA4 property on [Google Analytics](https://analytics.google.com).
2. Copy your **Measurement ID** (`G-XXXXXXXXXX`).
3. In `frontend/index.html`, add the Google tag snippet in `<head>`.

---

## STEP 14: Activating Razorpay Online Payments (When Ready)

When you receive your official Razorpay Key ID and Secret:
1. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in backend environment variables.
2. In store admin dashboard, enable Razorpay toggle under Settings.
3. Online payments will automatically activate on checkout alongside Cash on Delivery and WhatsApp ordering!
