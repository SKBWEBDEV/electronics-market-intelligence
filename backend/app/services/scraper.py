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


    print("Scraping Star Tech...")

    raw_products.extend(
        scrape_startech()
    )


    print("Scraping Ryans...")

    raw_products.extend(
        scrape_ryans()
    )


    print(
        "Total scraped:",
        len(raw_products)
    )



    new_products = 0
    price_changes = 0



    for item in raw_products:


        product = clean_product(item)



        old_product = products_collection.find_one(
            {
                "url": product["url"]
            }
        )



        # New product

        if not old_product:


            product["created_at"] = datetime.now()


            products_collection.insert_one(
                product
            )


            new_products += 1



        else:


            old_price = old_product.get(
                "price"
            )


            new_price = product.get(
                "price"
            )



            if old_price != new_price:


                price_history_collection.insert_one(

                    {
                        "name": product["name"],

                        "brand": product.get("brand"),

                        "old_price": old_price,

                        "new_price": new_price,

                        "date": datetime.now()

                    }

                )


                price_changes += 1



            products_collection.update_one(

                {
                    "_id": old_product["_id"]
                },

                {
                    "$set": product
                }

            )




    scraper_logs_collection.insert_one(

        {

            "last_run": datetime.now(),

            "new_products": new_products,

            "price_changes": price_changes,

            "status": "success"

        }

    )



    return {

        "message": "Scraping completed",

        "total": len(raw_products),

        "new_products": new_products,

        "price_changes": price_changes

    }



if __name__ == "__main__":

    result = run_scraper()

    print(result)