from fastapi import FastAPI
from app.routes.products import router as product_router
from app.routes.scraper import router as scraper_router
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager
from apscheduler.schedulers.background import BackgroundScheduler
from scraper.runner import run_scraper

from app.routes.price_changes import router as price_changes_router
from app.routes.price_summary import router as price_summary_router

scheduler = BackgroundScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):

    # Server start হলে scheduler চালু হবে
    scheduler.add_job(
    run_scraper,
    "cron",
    hour=9,
    minute=1
)

    scheduler.start()

    print("Background Scheduler Started 🚀")

    yield

    # Server বন্ধ হলে scheduler বন্ধ হবে
    scheduler.shutdown()

    print("Scheduler Stopped")


app = FastAPI(
    title="Electronics Market Dashboard API",
    version="1.0.0",
    lifespan=lifespan
)


# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(product_router)
app.include_router(scraper_router)
app.include_router(price_changes_router)
app.include_router(price_summary_router)

@app.get("/")
def home():
    return {
        "message": "Electronics Market Dashboard API Running 🚀"
    }