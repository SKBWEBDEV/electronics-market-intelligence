from apscheduler.schedulers.blocking import BlockingScheduler
from scraper.runner import run_scraper


scheduler = BlockingScheduler(
    timezone="Asia/Dhaka"
)


# TEST: প্রতি ১ মিনিটে চলবে
@scheduler.scheduled_job(
    "interval",
    minutes=1
)
def test_scheduler():

    print("TEST SCHEDULER RUNNING")


# Production scraper (রাত ৮টায়)
@scheduler.scheduled_job(
    "cron",
    hour=20,
    minute=0
)
def daily_scraping():

    print("Daily scraper started...")

    run_scraper()

    print("Daily scraper finished...")


def start_scheduler():

    print("Scheduler running...")

    scheduler.start()