from app.database.mongodb import products_collection


products = products_collection.find().limit(5)


for product in products:
    print("----------------")
    print("Name:", product.get("name"))
    print("Brand:", product.get("brand"))
    print("Price:", product.get("price"))
    print("Category:", product.get("category"))