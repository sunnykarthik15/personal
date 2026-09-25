import sys
import os
import logging

# Ensure root in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.config import settings
from backend.app.database.session import engine, Base
from backend.app.seed.seed_data import seed_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("vaishno_karthik_migration")

def run_migrations_and_seed():
    db_url = settings.get_database_url()
    # Mask password for secure logging
    safe_db_url = db_url.split("@")[-1] if "@" in db_url else db_url
    logger.info(f"Connecting to database target: ...@{safe_db_url}")

    logger.info("Executing schema migration (create_all)...")
    Base.metadata.create_all(bind=engine)
    logger.info("Schema tables verified successfully.")

    logger.info("Checking catalog seed data...")
    seed_database()
    logger.info("Database migration & seed verification complete.")

if __name__ == "__main__":
    run_migrations_and_seed()
