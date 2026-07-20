from scraper.startech import scrape_startech
from scraper.ryans import scrape_ryans
from scraper.daraz import scrape_daraz
from scraper.cleaner import clean_product

from app.database.mongodb import (
    products_collection,
    price_history_collection,
    scraper_logs_collection
)

from datetime import datetime


def run_scraper():

    raw_products = []

    try:

        print("Scraping Startech...")
        raw_products.extend(scrape_startech())

        print("Scraping Ryans...")
        raw_products.extend(scrape_ryans())

        print("Scraping Daraz...")
        raw_products.extend(scrape_daraz())


        print("Total scraped products:", len(raw_products))


        new_count = 0
        price_changes = 0


        for item in raw_products:

            try:

                product = clean_product(item)


                if not product.get("url"):
                    continue


                if not product.get("source"):
                    product["source"] = "Unknown"


                old_product = products_collection.find_one(
                    {
                        "url": product["url"]
                    }
                )


                # New Product
                if not old_product:

                    product["created_at"] = datetime.now()

                    products_collection.insert_one(product)

                    new_count += 1


                # Existing Product
                else:

                    old_price = old_product.get("price", 0)
                    new_price = product.get("price", 0)


                    if old_price != new_price:

                        change_amount = new_price - old_price

                        change_type = (
                            "increase"
                            if change_amount > 0
                            else "decrease"
                        )


                        price_history_collection.insert_one(
                            {
                                "product_id": old_product["_id"],
                                "name": product.get("name"),
                                "brand": product.get("brand"),
                                "category": product.get("category"),
                                "old_price": old_price,
                                "new_price": new_price,
                                "change_amount": change_amount,
                                "change_type": change_type,
                                "source": product.get("source"),
                                "date": datetime.now()
                            }
                        )


                        price_changes += 1



                    products_collection.update_one(
                        {
                            "_id": old_product["_id"]
                        },
                        {
                            "$set":
                            {
                                "name": product.get("name"),
                                "brand": product.get("brand"),
                                "category": product.get("category"),
                                "price": product.get("price"),
                                "old_price": product.get("old_price", 0),
                                "discount": product.get("discount", ""),
                                "rating": product.get("rating", 0),
                                "reviews": product.get("reviews", 0),
                                "image": product.get("image"),
                                "source": product.get("source"),
                                "updated_at": datetime.now()
                            }
                        }
                    )


            except Exception as e:

                print(
                    "Product processing error:",
                    e
                )



        scraper_logs_collection.insert_one(
            {
                "last_run": datetime.now(),
                "total_products": len(raw_products),
                "new_products": new_count,
                "price_changes": price_changes,
                "status": "success"
            }
        )


        print("======================")
        print(f"New Products: {new_count}")
        print(f"Price Changes: {price_changes}")
        print("Scraper Finished")
        print("======================")


    except Exception as e:

        print(
            "SCRAPER FAILED:",
            e
        )


        scraper_logs_collection.insert_one(
            {
                "last_run": datetime.now(),
                "status": "failed",
                "error": str(e)
            }
        )



if __name__ == "__main__":
    run_scraper()