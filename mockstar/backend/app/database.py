import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

DATABASE_URL = settings.DATABASE_URL
connect_args = {}

is_prod = settings.ENVIRONMENT.lower() == "production"

if is_prod and (not DATABASE_URL or DATABASE_URL.startswith("sqlite")):
    raise RuntimeError("SQLite is not allowed in production. Please configure a valid PostgreSQL DATABASE_URL.")

try:
    if DATABASE_URL.startswith("sqlite"):
        connect_args["check_same_thread"] = False
    
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
    # Verify the connection works
    with engine.connect() as conn:
        pass
    print("Database: Connected to PostgreSQL database successfully.")
except Exception as e:
    if is_prod:
        raise RuntimeError(f"Database connection failed in production: {e}") from e
    print(f"Database: Warning - Connection failed ({e}). Falling back to local SQLite database.")
    # Place sqlite db in the backend directory
    sqlite_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "mockstar.db")
    DATABASE_URL = f"sqlite:///{sqlite_path}"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative base class for models
Base = declarative_base()

# DB dependency for FastAPI routers
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
