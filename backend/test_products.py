from app.database.mongodb import products_collection


products = products_collection.find().limit(5)


for product in products:
    print(product)