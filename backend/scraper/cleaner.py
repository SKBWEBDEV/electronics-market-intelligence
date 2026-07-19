import re



def clean_price(price_text):

    if price_text is None:
        return 0


    # Ryans থেকে int আসলে
    if isinstance(price_text, (int, float)):
        return float(price_text)



    # String হলে
    numbers = re.findall(
        r'\d+',
        price_text.replace(',', '')
    )


    if numbers:
        return float(
            numbers[0]
        )


    return 0





def detect_category(name):

    name = name.lower()


    if "laptop" in name:
        return "Laptop"


    if (
        "gpu" in name
        or "graphics card" in name
        or "geforce" in name
        or "radeon" in name
    ):
        return "GPU"


    if "ssd" in name or "hdd" in name:
        return "Storage"


    if "ram" in name or "memory" in name:
        return "RAM"


    if "monitor" in name or "display" in name:
        return "Monitor"


    if "keyboard" in name or "mouse" in name:
        return "Accessories"


    if "casing" in name or "case" in name:
        return "Casing"


    if "cooler" in name:
        return "Cooling"


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
            product.get(
                "name",
                ""
            )
        ),

        "price": clean_price(
            product.get(
                "price"
            )
        ),

        "image": product.get(
            "image"
        ),

        "url": product.get(
            "url"
        ),

        "source": product.get(
            "source",
            "Unknown"
        )

    }