from apscheduler.schedulers.background import BackgroundScheduler
from scraper.runner import run_scraper


scheduler = BackgroundScheduler(
    timezone="Asia/Dhaka"
)


# Test: আজ রাত ৮:৩৫ এ scraper চলবে
@scheduler.scheduled_job(
    "cron",
    hour=20,
    minute=35
)
def daily_scraping():

    print("Daily scraper started...")

    run_scraper()

    print("Daily scraper finished...")


def start_scheduler():

    print("Scheduler running...")

    scheduler.start()

    print("Scheduler Started ✅")