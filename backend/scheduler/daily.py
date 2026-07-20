import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime

from scraper.runner import run_scraper


scheduler = BlockingScheduler(
    timezone="Asia/Dhaka"
)


def auto_scraping():

    print("==============================")
    print("AUTO SCRAPER STARTED")
    print(datetime.now())
    print("==============================")


    try:

        run_scraper()

        print("==============================")
        print("AUTO SCRAPER FINISHED ✅")
        print("==============================")


    except Exception as e:

        print("==============================")
        print("SCRAPER ERROR ❌")
        print(e)
        print("==============================")




scheduler.add_job(
    auto_scraping,
    "interval",
    hours=6,
    start_date="2026-07-20 20:00:00",
    id="electronics_price_scraper",
    replace_existing=True,
    max_instances=1,
    coalesce=True
)


def start_scheduler():

    print("Scheduler running...")

    scheduler.start()



if __name__ == "__main__":
    start_scheduler()