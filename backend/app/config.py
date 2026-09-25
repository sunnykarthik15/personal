import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union

class Settings(BaseSettings):
    PROJECT_NAME: str = "VAISHNO KARTHIK DRY FRUITS, SPICES & COLD PRESSED OILS"
    ENVIRONMENT: str = "development" # "development" or "production"
    API_V1_STR: str = "/api"
    
    # Database Configuration (Supabase PostgreSQL / Managed Postgres / Local SQLite fallback)
    DATABASE_URL: str = "sqlite:///./vaishno_karthik.db"
    
    # JWT Security
    JWT_SECRET: str = "vaishno-karthik-production-secret-key-change-via-env-2026"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Store Contacts from business poster
    PRIMARY_PHONE: str = "9848856787"
    SECONDARY_PHONE: str = "9642145789"
    WHATSAPP_NUMBER: str = "9848856787"
    STORE_LOCATION: str = "Telangana & Andhra Pradesh, India"
    
    # Default Admin Credentials
    ADMIN_EMAIL: str = "admin@vaishnokarthik.com"
    ADMIN_PASSWORD: str = "Admin@VK2026"
    
    # CORS Configuration
    CORS_ORIGINS: Union[str, List[str]] = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"
    
    # Supabase Integration (PostgreSQL & Object Storage)
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_STORAGE_BUCKET: str = "product-images"
    
    # Razorpay Payment Gateway Placeholders
    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""

    def get_cors_origins(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, list):
            return self.CORS_ORIGINS
        if isinstance(self.CORS_ORIGINS, str):
            origins = [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]
            return origins if origins else ["http://localhost:5173"]
        return ["http://localhost:5173"]

    def get_database_url(self) -> str:
        url = self.DATABASE_URL
        # Normalize Heroku/Supabase postgres:// scheme to postgresql://
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url

    model_config = SettingsConfigDict(env_file=".env", extra="allow")

settings = Settings()
