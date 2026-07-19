from apscheduler.schedulers.blocking import BlockingScheduler
from scraper.runner import run_scraper


scheduler = BlockingScheduler()


# প্রতিদিন সকাল 10টায় scraper চলবে
@scheduler.scheduled_job(
    "cron",
    hour=20,
    minute=12
)
def daily_scraping():

    print("Daily scraper started...")

    run_scraper()

    print("Daily scraper finished...")


def start_scheduler():

    print("Scheduler running...")

    scheduler.start()