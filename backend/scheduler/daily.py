from apscheduler.schedulers.blocking import BlockingScheduler
from scraper.runner import run_scraper


scheduler = BlockingScheduler(
    timezone="Asia/Dhaka"
)


# প্রতিদিন রাত ৮:১২ টায় scraper চলবে (testing)
@scheduler.scheduled_job(
    "cron",
    hour=20,
    minute=20
)
def daily_scraping():

    print("Daily scraper started...")

    run_scraper()

    print("Daily scraper finished...")


def start_scheduler():

    print("Scheduler running...")

    scheduler.start()