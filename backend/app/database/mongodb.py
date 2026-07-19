from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")


client = MongoClient(MONGO_URL)


db = client["electronics_market"]


products_collection = db["products"]


price_history_collection = db["price_history"]


scraper_logs_collection = db["scraper_logs"]