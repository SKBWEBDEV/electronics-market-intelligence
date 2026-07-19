from app.database.mongodb import products_collection


count = products_collection.count_documents({})

print("Total products:", count)