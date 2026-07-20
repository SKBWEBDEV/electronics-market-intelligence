from app.database.mongodb import (
    products_collection,
    price_history_collection
)
from collections import Counter
from bson import ObjectId


def convert_objectid(data):

    if isinstance(data, list):
        return [
            convert_objectid(item)
            for item in data
        ]

    if isinstance(data, dict):
        return {
            key: convert_objectid(value)
            for key, value in data.items()
        }

    if isinstance(data, ObjectId):
        return str(data)

    return data

# Total Products + Price Statistics
def get_product_stats():

    total_products = products_collection.count_documents({})


    pipeline = [

        {
            "$group": {

                "_id": None,

                "average_price": {
                    "$avg": "$price"
                },

                "highest_price": {
                    "$max": "$price"
                },

                "lowest_price": {
                    "$min": "$price"
                }

            }
        }

    ]


    result = list(
        products_collection.aggregate(pipeline)
    )


    if result:

        data = result[0]


        return {

            "total_products": total_products,

            "average_price": round(
                data["average_price"]
            ),

            "highest_price": data["highest_price"],

            "lowest_price": data["lowest_price"]

        }



    return {

        "total_products": 0,

        "average_price": 0,

        "highest_price": 0,

        "lowest_price": 0

    }








# Trending Products
def get_trending_products():


    products = list(

        products_collection.find(

            {},

            {
                "_id":0
            }

        )

        .sort(

            [
                ("reviews",-1),
                ("rating",-1)
            ]

        )

        .limit(5)

    )


    return products







# Brand Analysis
def get_brand_stats():


    pipeline = [

        {

            "$group": {

                "_id":"$brand",

                "products":{

                    "$sum":1

                }

            }

        },

        {

            "$sort":{

                "products":-1

            }

        }

    ]



    result = list(

        products_collection.aggregate(pipeline)

    )



    brands = []



    for item in result:


        if item["_id"]:


            brands.append(

                {

                    "brand":item["_id"],

                    "products":item["products"]

                }

            )



    return brands







# Category Analysis
def get_category_stats():


    pipeline = [

        {

            "$group": {

                "_id":"$category",

                "products":{

                    "$sum":1

                }

            }

        },

        {

            "$sort":{

                "products":-1

            }

        }

    ]



    result = list(

        products_collection.aggregate(pipeline)

    )



    categories = []



    for item in result:


        if item["_id"]:


            categories.append(

                {

                    "category": item["_id"],

                    "products": item["products"]

                }

            )


    return categories



# Price Drop Products

def get_price_drop_products():

    products = list(
        price_history_collection.find(
            {
                "change_type": "decrease"
            },
            {
                "_id": 0
            }
        )
        .sort(
            "date",
            -1
        )
        .limit(20)
    )


    return convert_objectid(products)



# Price History

def get_price_history():

    history = list(
        price_history_collection.find(
            {},
            {
                "_id":0
            }
        )
        .sort(
            "date",
            -1
        )
        .limit(20)
    )

    return convert_objectid(history)



# Demand Score Analysis

def get_demand_products():


    products = list(
        products_collection.find(
            {},
            {
                "_id":0
            }
        )
    )


    if not products:
        return []


    brand_count = Counter(
        p.get("brand","Unknown")
        for p in products
    )


    category_count = Counter(
        p.get("category","Unknown")
        for p in products
    )


    max_brand = max(
        brand_count.values(),
        default=1
    )


    max_category = max(
       category_count.values(),
       default=1
    )


    result = []


    for product in products:


        score = 0


        brand = product.get(
            "brand",
            "Unknown"
        )


        category = product.get(
            "category",
            "Unknown"
        )


        # Brand popularity 25%

        if brand != "Unknown":

            score += (
                brand_count[brand] /
                max_brand
            ) * 25



        # Category popularity 25%

        score += (
            category_count[category] /
            max_category
        ) * 25



        # Rating Score 20%

        rating = product.get("rating") or 0

        rating = float(rating)

        score += (
            rating / 5
        ) * 20



        # Review Score 20%

        reviews = product.get("reviews") or 0

        reviews = int(reviews)

        score += min(
            reviews / 1000,
            1
        ) * 20



        # Availability 10%

        if product.get("price"):

            score += 10



        product["demandScore"] = round(score)


        if score >= 75:

            product["trend"] = "🔥 Hot"


        elif score >= 50:

            product["trend"] = "📈 Rising"


        else:

            product["trend"] = "Normal"



        result.append(product)

   
    result.sort(
        key=lambda x:x["demandScore"],
        reverse=True
    )

    return result[:5]



# from datetime import datetime

# Price Changes Summary

def get_price_changes():

    history = list(
        price_history_collection.find(
            {},
            {
                "_id": 0
            }
        )
    )


    increased = 0
    decreased = 0
    stable = 0


    for item in history:

        change_type = item.get(
            "change_type",
            "stable"
        )


        if change_type == "increase":
            increased += 1

        elif change_type == "decrease":
            decreased += 1

        else:
            stable += 1


    return {
        "price_increased": increased,
        "price_decreased": decreased,
        "price_stable": stable
    }