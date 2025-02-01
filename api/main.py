import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware

from api.routes import router  # Import router from routes.py

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,  # Set to DEBUG for development, INFO/WARNING for production
)
logger = logging.getLogger("gide_rag-api")

app = FastAPI(
    title="AI Gide_RAG API", description="API for extracting data from documents."
)

# Add CORS Middleware to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from React dev server
    allow_credentials=True,  # If using cookies/authentication
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (like Content-Type, Authorization, etc.)
)

# Include your router
app.include_router(router)
