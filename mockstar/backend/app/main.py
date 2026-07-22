from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, profile, resumes, sessions
from app import models
from app.config import settings

# Automatically create database tables from SQLAlchemy models
try:
    print("Database: Auto-creating tables if they do not exist...")
    Base.metadata.create_all(bind=engine)
    print("Database: Tables initialized successfully.")
except Exception as e:
    print(f"Database: Warning - Tables auto-creation skipped or failed ({e}).")

# Initialize FastAPI App
app = FastAPI(
    title="Mockstar AI Backend",
    description="Python FastAPI REST API server for Mockstar Resume Parser and AI Mock Interviewer",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
if not settings.ALLOWED_ORIGINS:
    raise RuntimeError("ALLOWED_ORIGINS environment variable is missing or empty. Please specify allowed origins for CORS.")

allowed_origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
)

# Register API routers
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(resumes.router)
app.include_router(sessions.router)

@app.get("/")
def read_root():
    """Welcome endpoint for the API service."""
    return {
        "message": "Welcome to Mockstar AI Backend Service!",
        "status": "online",
        "documentation": "/docs"
    }
