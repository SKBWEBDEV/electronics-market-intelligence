from fastapi import APIRouter
from app.database.mongodb import scraper_logs_collection


router = APIRouter()


@router.get("/scraper-logs")
def get_scraper_logs():

    logs = list(
        scraper_logs_collection
        .find()
        .sort("created_at", -1)
        .limit(20)
    )

    for log in logs:
        log["_id"] = str(log["_id"])

    return logs