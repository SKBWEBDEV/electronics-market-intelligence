from fastapi import APIRouter

from scraper.runner import run_scraper
from app.database.mongodb import scraper_logs_collection

router = APIRouter(
    prefix="/scraper",
    tags=["Scraper"]
)


@router.get("/")
def run_market_scraper():

    run_scraper()

    return {
        "message": "Market data updated successfully 🚀"
    }


@router.get("/status")
def scraper_status():

    log = scraper_logs_collection.find_one(
        sort=[
            ("last_run", -1)
        ]
    )


    if not log:
        return {
            "message": "No scraper data found"
        }


    return {
        "last_run": log["last_run"],
        "new_products": log["new_products"],
        "price_changes": log["price_changes"],
        "status": log["status"]
    }