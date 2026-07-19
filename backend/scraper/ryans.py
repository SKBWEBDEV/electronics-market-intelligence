import requests
from app.utils.brand_detector import extract_brand
from bs4 import BeautifulSoup
from datetime import datetime


URL = "https://www.ryans.com/category/laptop"


def scrape_ryans():

    headers = {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120 Safari/537.36",

        "Accept-Language":
            "en-US,en;q=0.9"
    }


    response = requests.get(
        URL,
        headers=headers,
        timeout=20
    )


    if response.status_code != 200:
        print("Status:", response.status_code)
        return []


    with open(
        "ryans_page.html",
        "w",
        encoding="utf-8"
    ) as f:
        f.write(response.text)


    print("HTML saved")


    soup = BeautifulSoup(
        response.text,
        "lxml"
    )


    products = []


    items = soup.select(
        ".card.h-100"
    )


    print(
        "Found items:",
        len(items)
    )


    for item in items:


        name_tag = item.select_one(
            ".product-name a"
        )


        price_tag = item.select_one(
            ".pr-text"
        )


        image_tag = item.select_one(
            ".image-box img"
        )


        if not name_tag:
            continue


        # Product Name
        name = name_tag.get_text(
            " ",
            strip=True
        )


        if "33." in name:
            name = name.split("33.")[0].strip()



        # Price
        price = None

        if price_tag:

            price_text = price_tag.get_text(
                strip=True
            )

            price = (
                price_text
                .replace("Tk", "")
                .replace(",", "")
                .strip()
            )



        # Image
        image = None

        if image_tag:
            image = image_tag.get(
                "src"
            )






        product = {

            "name": name,

            "brand": extract_brand(name),

            "category": "Laptop",

            "price": int(price)
            if price and price.isdigit()
            else None,

            "image": image,

            "url": name_tag.get(
                "href"
            ),

            "source": "Ryans",

            "created_at": datetime.now()

        }


        products.append(product)



    return products





if __name__ == "__main__":


    data = scrape_ryans()


    print(
        "Ryans Products:",
        len(data)
    )


    for p in data[:5]:

        print(p)