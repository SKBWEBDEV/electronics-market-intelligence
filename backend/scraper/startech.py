print("STARTECH RUNNING")

import requests
from app.utils.brand_detector import extract_brand
from bs4 import BeautifulSoup
from datetime import datetime


print("IMPORT OK")


CATEGORIES = {

    "Laptop":
    "https://www.startech.com.bd/laptop-notebook",


    "Storage":
    "https://www.startech.com.bd/ssd",


    "Monitor":
    "https://www.startech.com.bd/monitor",


    "Component":
    "https://www.startech.com.bd/component"

}


HEADERS = {
    "User-Agent": "Mozilla/5.0"
}



# Extract rating + reviews from product page
def get_product_details(url):

    try:

        response = requests.get(
            url,
            headers=HEADERS,
            timeout=10
        )


        if response.status_code != 200:

            return {
                "rating": 0,
                "reviews": 0
            }



        soup = BeautifulSoup(
            response.text,
            "lxml"
        )


        rating = 0
        reviews = 0



        # Rating detect

        rating_tag = soup.select_one(
            ".product-rating"
        )


        if rating_tag:

            stars = rating_tag.select(
                "i"
            )

            rating = len(stars)



        # Reviews detect

        review_tags = soup.find_all(
            string=lambda text:
            text and "review" in text.lower()
        )


        for text in review_tags:

            numbers = "".join(
                filter(
                    str.isdigit,
                    text
                )
            )


            if numbers:

                reviews = int(numbers)

                break



        return {

            "rating": rating,

            "reviews": reviews

        }



    except Exception as e:

        print(
            "Detail scrape error:",
            e
        )


        return {

            "rating": 0,

            "reviews": 0

        }








def scrape_startech():

    products = []


    for category, url in CATEGORIES.items():

        print(
            "Scraping:",
            category
        )


        response = requests.get(
            url,
            headers=HEADERS,
            timeout=10
        )


        soup = BeautifulSoup(
            response.text,
            "lxml"
        )


        items = soup.select(
            ".p-item"
        )


        print(
            category,
            "items:",
            len(items)
        )



        for item in items:

            name_tag = item.select_one(
                ".p-item-name"
            )

            price_tag = item.select_one(
                ".p-item-price"
            )

            link_tag = item.select_one(
                "a"
            )

            image_tag = item.select_one(
                ".p-item-img img"
            )


            if name_tag and price_tag and link_tag:

                name = name_tag.text.strip()


                url = link_tag.get(
                    "href"
                )


                product = {

                    "name": name,

                    "brand": extract_brand(name),

                    "category": category,

                    "price": price_tag.text.strip(),

                    "image": (
                        image_tag.get("src")
                        if image_tag
                        else None
                    ),

                    "url": url,

                    "source": "Star Tech",

                    "created_at": datetime.now()

                }


                products.append(product)


    return products






if __name__ == "__main__":


    data = scrape_startech()



    print(
        "TOTAL PRODUCTS:",
        len(data)
    )



    for product in data:

        print(product)