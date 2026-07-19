from apscheduler.schedulers.blocking import BlockingScheduler
from scraper.runner import run_scraper


scheduler = BlockingScheduler()


# প্রতিদিন সকাল ৯টায় scraper চলবে
@scheduler.scheduled_job(
    "cron",
    hour=10,
    minute=0
)
def daily_scraping():

    print("Daily scraper started...")

    run_scraper()

    print("Daily scraper finished...")


if __name__ == "__main__":

    print("Scheduler running...")

    scheduler.start()