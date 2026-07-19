import requests
from bs4 import BeautifulSoup
from datetime import datetime

from app.database.mongodb import (
    products_collection,
    price_history_collection
)



def extract_brand(name):

    brands = [
        "Samsung",
        "MSI",
        "Dell",
        "Lenovo",
        "Asus",
        "Sony",
        "Apple",
        "AMD",
        "Intel",
        "AOC",
        "SINGER",
        "Haier",
        "DJI",
        "XINJI",
        "APOLLO",
        "EcoFlow",
        "Marsriva",
        "Xtrike"
    ]


    for brand in brands:

        if brand.lower() in name.lower():

            return brand


    return None





def extract_category(name):

    name = name.lower()


    categories = {


        "Laptop": [
            "laptop",
            "notebook"
        ],


        "Monitor": [
            "monitor"
        ],


        "AC": [
            "air conditioner",
            " ac"
        ],


        "Gaming": [
            "gaming",
            "playstation",
            "gpu"
        ],


        "Mobile": [
            "iphone",
            "galaxy",
            "smartphone"
        ],


        "Camera": [
            "camera",
            "drone"
        ],


        "PC": [
            "desktop pc",
            "mini pc",
            "tower",
            "computer"
        ]

    }



    for category, keywords in categories.items():

        for keyword in keywords:

            if keyword in name:

                return category


    return "Electronics"







def extract_prices(price_text):

    if not price_text:

        return None, None



    numbers = []


    text = (
        price_text
        .replace(",", "")
        .replace("৳", " ")
    )



    for word in text.split():

        if word.isdigit():

            numbers.append(int(word))



    if len(numbers) >= 2:

        return numbers[0], numbers[1]


    elif len(numbers) == 1:

        return numbers[0], None


    return None, None







def calculate_discount(price, old_price):

    if price and old_price and old_price > price:


        discount = (

            (old_price - price)
            /
            old_price

        ) * 100



        return f"{round(discount)}%"


    return None







def scrape_products():

    try:


        url = "https://www.startech.com.bd"



        headers = {

            "User-Agent": "Mozilla/5.0"

        }



        response = requests.get(

            url,

            headers=headers,

            timeout=10

        )



        soup = BeautifulSoup(

            response.text,

            "html.parser"

        )



        products = []



        items = soup.find_all(

            "div",

            class_="p-item"

        )





        for item in items[:20]:


            name_tag = item.find(

                "h4",

                class_="p-item-name"

            )



            price_tag = item.find(

                "div",

                class_="p-item-price"

            )


            image_tag = item.find("img")

            link_tag = item.find("a")




            if name_tag and price_tag:



                name = name_tag.text.strip()



                price, old_price = extract_prices(

                    price_tag.text

                )



                product = {


                    "name": name,


                    "brand": extract_brand(name),


                    "category": extract_category(name),


                    "price": price,


                    "old_price": old_price,


                    "discount": calculate_discount(

                        price,

                        old_price

                    ),


                    "rating": None,


                    "reviews": None,


                    "url": (

                        link_tag["href"]

                        if link_tag and link_tag.get("href")

                        else url

                    ),


                    "image": (

                        image_tag["src"]

                        if image_tag and image_tag.get("src")

                        else None

                    )

                }



                products.append(product)





        added = 0

        updated = 0

        price_changes = 0






        for product in products:



            exists = products_collection.find_one(

                {
                    "url": product["url"]
                }

            )





            # New Product

            if not exists:


                products_collection.insert_one(product)

                added += 1





            # Existing Product

            else:



                old_price = exists.get("price")

                new_price = product.get("price")





                if old_price != new_price:



                    price_history_collection.insert_one(

                        {

                            "product_name": product["name"],

                            "brand": product["brand"],

                            "old_price": old_price,

                            "new_price": new_price,

                            "date": datetime.now()

                        }

                    )


                    price_changes += 1





                products_collection.update_one(

                    {
                        "url": product["url"]
                    },

                    {

                        "$set": product

                    }

                )


                updated += 1






        return {


            "message": "Real scraping completed",


            "products_found": len(products),


            "products_added": added,


            "products_updated": updated,


            "price_changes_detected": price_changes


        }






    except Exception as e:


        return {


            "message": "Scraping failed",

            "error": str(e)

        }