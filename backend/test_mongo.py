from app.database.mongodb import products_collection


result = products_collection.delete_many(
    {
        "url": {
            "$regex": "startech.com.bd"
        }
    }
)


print("Deleted:", result.deleted_count)