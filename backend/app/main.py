import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from backend.app.config import settings
from backend.app.database.session import engine, Base
from backend.app.seed.seed_data import seed_database
from backend.app.api import categories, products, orders, auth, admin, settings as store_settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("vaishno_karthik")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: ensure tables and seed catalog data
    logger.info("Initializing database and verifying tables...")
    Base.metadata.create_all(bind=engine)
    try:
        seed_database()
    except Exception as e:
        logger.error(f"Error during seed execution: {e}")
    yield
    # Shutdown
    logger.info("Vaishno Karthik API service stopped.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Production REST API for Vaishno Karthik Dry Fruits, Spices & Cold Pressed Oils e-commerce store.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS setup for production and local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for local uploads fallback
uploads_dir = os.path.join(os.getcwd(), "backend", "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/api/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Global Safe Error Handler to protect sensitive database details
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error on {request.method} {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Something went wrong on our end. Please try again or contact support."},
    )

# Register API Routers
app.include_router(categories.router, prefix=settings.API_V1_STR)
app.include_router(products.router, prefix=settings.API_V1_STR)
app.include_router(orders.router, prefix=settings.API_V1_STR)
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
app.include_router(store_settings.router, prefix=settings.API_V1_STR)

# Top-level Health Check endpoint for cloud platforms (Render, Railway, Fly.io, AWS)
@app.get("/health")
def root_health_check():
    return {"status": "healthy"}

@app.get("/api/health")
def api_health_check():
    return {
        "status": "healthy",
        "service": "Vaishno Karthik Store API",
        "environment": settings.ENVIRONMENT
    }

@app.get("/")
def root():
    return {
        "business": settings.PROJECT_NAME,
        "tagline": "Pure Goodness, Traditionally Crafted",
        "api_docs": "/docs",
        "health": "/health",
        "status": "operational"
    }
