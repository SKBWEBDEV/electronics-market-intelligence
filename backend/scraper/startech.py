import requests
from bs4 import BeautifulSoup
from datetime import datetime


URL = "https://www.startech.com.bd/component"


def scrape_startech():

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(URL, headers=headers)

    if response.status_code != 200:
        print("Website load failed")
        return []

    soup = BeautifulSoup(response.text, "lxml")

    products = []

    items = soup.select(".p-item")

    for item in items:

        name_tag = item.select_one(".p-item-name")
        price_tag = item.select_one(".p-item-price")
        link_tag = item.select_one("a")
        image_tag = item.select_one(".p-item-img img")

        if name_tag and price_tag:

            name = name_tag.text.strip()

            # brand detect
            brands = [
                "MSI",
                "ASUS",
                "Seagate",
                "Netac",
                "Lexar",
                "Deepcool",
                "AFOX",
                "TwinMOS"
            ]

            brand = "Unknown"

            for b in brands:
                if b.lower() in name.lower():
                    brand = b
                    break


            product = {
                "name": name,
    "brand": brand,
    "category": "Component",
    "price": price_tag.text.strip(),
    "image": image_tag["src"] if image_tag else None,
    "url": link_tag["href"] if link_tag else None,
    "source": "Star Tech",
    "created_at": datetime.now()
            }

            products.append(product)

    return products


if __name__ == "__main__":

    data = scrape_startech()

    for product in data:
        print(product)