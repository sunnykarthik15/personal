import sys
import os
import pytest

# Add root directory to python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.database.session import engine, Base
from backend.app.seed.seed_data import seed_database

@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield
