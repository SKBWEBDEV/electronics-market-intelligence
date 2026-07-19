from scraper.startech import scrape_startech
from scraper.ryans import scrape_ryans
from scraper.cleaner import clean_product

from app.database.mongodb import (
    products_collection,
    price_history_collection,
    scraper_logs_collection
)

from datetime import datetime



def run_scraper():

    raw_products = []


    # Startech products

    print("Scraping Startech...")

    raw_products.extend(
        scrape_startech()
    )



    # Ryans products

    print("Scraping Ryans...")

    raw_products.extend(
        scrape_ryans()
    )



    print(
        "Total scraped products:",
        len(raw_products)
    )



    new_count = 0

    price_changes = 0




    for item in raw_products:


        product = clean_product(item)



        old_product = products_collection.find_one(

            {
                "url": product["url"]
            }

        )



        # New Product

        if not old_product:


            product["created_at"] = datetime.now()


            products_collection.insert_one(
                product
            )


            new_count += 1




        # Existing Product

        else:


            old_price = old_product.get(
                "price"
            )


            new_price = product.get(
                "price"
            )



            # Price History

            if old_price != new_price:


                change_amount = new_price - old_price


                change_type = (
                    "increase"
                    if change_amount > 0
                    else "decrease"
                )



                price_history_collection.insert_one(

                    {

                        "name": product["name"],

                        "brand": product.get(
                            "brand"
                        ),

                        "category": product.get(
                            "category"
                        ),

                        "old_price": old_price,

                        "new_price": new_price,

                        "change_amount": change_amount,

                        "change_type": change_type,

                        "source": product.get(
                            "source"
                        ),

                        "date": datetime.now()

                    }

                )


                price_changes += 1





            # Update Product


            products_collection.update_one(

                {
                    "_id": old_product["_id"]
                },


                {

                    "$set":

                    {

                        "brand": product.get(
                            "brand"
                        ),


                        "category": product.get(
                            "category"
                        ),


                        "price": product.get(
                            "price"
                        ),


                        "old_price": product.get(
                            "old_price"
                        ),


                        "discount": product.get(
                            "discount"
                        ),


                        "rating": product.get(
    "rating"
),


                        "reviews": product.get(
                            "reviews"
                        ),


                        "url": product.get(
                            "url"
                        ),


                        "image": product.get(
                            "image"
                        ),


                        "source": product.get(
                            "source"
                        )

                    }

                }

            )





    # Save scraper log


    scraper_logs_collection.insert_one(

        {

            "last_run": datetime.now(),

            "new_products": new_count,

            "price_changes": price_changes,

            "status": "success"

        }

    )




    print(

        f"New Products: {new_count}, Price Changes: {price_changes}"

    )





if __name__ == "__main__":


    run_scraper()