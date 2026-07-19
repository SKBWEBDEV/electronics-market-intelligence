from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import threading

from scheduler.daily import start_scheduler

from app.routes.products import router as product_router
from app.routes.scraper import router as scraper_router
from app.routes.price_changes import router as price_changes_router
from app.routes.price_summary import router as price_summary_router


@asynccontextmanager
async def lifespan(app: FastAPI):

    print("API Server Started 🚀")

    # Start daily scraper scheduler
    scheduler_thread = threading.Thread(
        target=start_scheduler,
        daemon=True
    )

    scheduler_thread.start()

    print("Scheduler Started ✅")

    yield

    print("API Server Stopped")


app = FastAPI(
    title="Electronics Market Dashboard API",
    version="1.0.0",
    lifespan=lifespan
)


# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://electronics-market-intelligence.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
app.include_router(product_router)
app.include_router(scraper_router)
app.include_router(price_changes_router)
app.include_router(price_summary_router)


@app.get("/")
def home():

    return {
        "message": "Electronics Market Dashboard API Running 🚀"
    }