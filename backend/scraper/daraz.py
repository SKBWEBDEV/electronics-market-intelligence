from playwright.sync_api import sync_playwright
from app.utils.brand_detector import extract_brand
from datetime import datetime
import re


CATEGORIES = {
    "Laptop": "https://www.daraz.com.bd/catalog/?q=laptop",
    "Mobile": "https://www.daraz.com.bd/catalog/?q=mobile",
    "Monitor": "https://www.daraz.com.bd/catalog/?q=monitor",
    "SSD": "https://www.daraz.com.bd/catalog/?q=ssd",
    "Keyboard": "https://www.daraz.com.bd/catalog/?q=keyboard"
}


def clean_price(price):
    if not price:
        return None

    price = re.sub(r"[^\d]", "", price)

    return int(price) if price else None



#
def detect_category(name):

    name = name.lower()


    # Laptop first
    if any(x in name for x in [
        "laptop",
        "notebook",
        "thinkpad",
        "vivobook",
        "macbook",
        "surface",
        "ideapad",
        "pavilion"
    ]):
        return "Laptop"



    if any(x in name for x in [
        "iphone",
        "samsung",
        "mobile",
        "phone",
        "smartphone"
    ]):
        return "Mobile"



    if any(x in name for x in [
        "monitor",
        "display"
    ]):
        return "Monitor"



    if any(x in name for x in [
        "ssd",
        "nvme",
        "hard disk"
    ]):
        return "Storage"



    if any(x in name for x in [
        "keyboard",
        "mouse"
    ]):
        return "Component"



    return "Other"


def scrape_daraz():

    products = []

    with sync_playwright() as p:

        browser = p.chromium.launch(
            headless=True
        )

        page = browser.new_page()


        for search_category,url in CATEGORIES.items():

            print(
                "Scraping Daraz Category:",
                search_category
            )


            page.goto(
                url,
                wait_until="networkidle",
                timeout=60000
            )


            page.wait_for_timeout(5000)


            items = page.locator(
                "div[data-qa-locator='product-item']"
            )


            print(
                search_category,
                "Products:",
                items.count()
            )



            for i in range(
                min(items.count(),20)
            ):

                item = items.nth(i)


                try:

                    name = ""


                    if item.locator(
                        "div.RfADt"
                    ).count():

                        name = item.locator(
                            "div.RfADt"
                        ).inner_text()


                    elif item.locator(
                        "a"
                    ).count():

                        name = item.locator(
                            "a"
                        ).first.get_attribute(
                            "title"
                        )


                    if not name:
                        continue



                    price = ""


                    if item.locator(
                        ".ooOxS"
                    ).count():

                        price = item.locator(
                            ".ooOxS"
                        ).inner_text()



                    link = None

                    try:

                        link = item.locator(
                            "a"
                        ).first.get_attribute(
                            "href"
                        )


                        if link:

                            if link.startswith("//"):

                                link = "https:" + link


                            elif link.startswith("/"):

                                link = (
                                    "https://www.daraz.com.bd"
                                    + link
                                )

                    except:
                        pass




                    image = None

                    try:

                        img = item.locator(
                            "img"
                        ).first


                        image = img.get_attribute(
                            "src"
                        )


                        if image and image.startswith(
                            "data:image"
                        ):

                            image = img.get_attribute(
                                "data-src"
                            )


                    except:
                        pass




                    product = {

                        "name": name,

                        "brand": extract_brand(name),

                        "category": detect_category(name),

                        "price": clean_price(price),

                        "image": image,

                        "url": link,

                        "source": "Daraz",

                        "created_at": datetime.now()

                    }


                    products.append(product)



                except Exception as e:

                    print(
                        "Daraz item error:",
                        e
                    )



        browser.close()


    return products




if __name__ == "__main__":

    data = scrape_daraz()


    print(
        "TOTAL DARAZ PRODUCTS:",
        len(data)
    )


    for product in data[:10]:

        print(product)