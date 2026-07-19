from apscheduler.schedulers.background import BackgroundScheduler
from scraper.runner import run_scraper


scheduler = BackgroundScheduler(
    timezone="Asia/Dhaka"
)



@scheduler.scheduled_job(
    "cron",
    hour=20,
    minute=45
)
def daily_scraping():

    print("Daily scraper started...")

    run_scraper()

    print("Daily scraper finished...")


def start_scheduler():

    print("Scheduler running...")

    scheduler.start()