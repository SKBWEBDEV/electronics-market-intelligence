from app.database.mongodb import (
    products_collection,
    price_history_collection
)


products_collection.delete_many({})

price_history_collection.delete_many({})


print("Database cleared successfully")