import re


def clean_price(price_text):

    if price_text is None:
        return 0

    if isinstance(price_text, (int, float)):
        return float(price_text)

    numbers = re.findall(
        r'\d+',
        price_text.replace(',', '')
    )

    return float(numbers[0]) if numbers else 0



def detect_category(name, source_category=None):

    # scraper category priority
    if source_category:
        return source_category


    name = name.lower()


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
        "mobile",
        "smartphone",
        "phone"
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
        "hdd"
    ]):
        return "Storage"



    if any(x in name for x in [
        "ram",
        "memory"
    ]):
        return "RAM"



    if any(x in name for x in [
        "keyboard",
        "mouse",
        "headphone"
    ]):
        return "Accessories"



    if any(x in name for x in [
        "gpu",
        "graphics card",
        "geforce",
        "radeon"
    ]):
        return "GPU"



    return "Component"




def clean_product(product):

    return {

        "name": product.get(
            "name",
            ""
        ),

        "brand": product.get(
            "brand",
            "Unknown"
        ),

        "category": detect_category(
            product.get("name",""),
            product.get("category")
        ),

        "price": clean_price(
            product.get("price")
        ),

        "old_price": clean_price(
            product.get("old_price")
        ),

        "discount": product.get(
            "discount",
            ""
        ),

        "rating": product.get(
            "rating",
            0
        ),

        "reviews": product.get(
            "reviews",
            0
        ),

        "image": product.get(
            "image",
            ""
        ),

        "url": product.get(
            "url",
            ""
        ),

        "source": product.get(
            "source",
            "Unknown"
        )

    }