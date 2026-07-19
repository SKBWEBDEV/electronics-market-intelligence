from app.database.mongodb import (
    products_collection,
    price_history_collection
)

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

        products_collection.find(

            {
                "discount": {
                    "$ne": None
                }
            },

            {
                "_id":0
            }

        )

        .sort(
            [
                ("discount",-1)
            ]
        )

        .limit(5)

    )


    return products



# Price History
def get_price_history():

    history = list(

        price_history_collection.find(
            {},
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


    return history