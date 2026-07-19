BRANDS = [
    
    "Western Digital",
    "WD",

    # Laptop / PC Brands
    "ASUS",
    "MSI",
    "Dell",
    "HP",
    "Lenovo",
    "Acer",
    "Apple",
    "Microsoft",
    "Huawei",
    "Samsung",
    "LG",
    "Walton",
    "Avita",
    "Infinix",
    "Xiaomi",
    "Realme",
    "TECNO",
    "Smart",


    # CPU / GPU Brands
    "Intel",
    "AMD",
    "NVIDIA",
    "Gigabyte",
    "ASRock",
    "Zotac",
    "PowerColor",
    "Sapphire",


    # Storage Brands
    "Seagate",
    "Western Digital",
    "WD",
    "Toshiba",
    "Kingston",
    "Lexar",
    "Netac",
    "Transcend",
    "TwinMOS",
    "TeamGroup",
    "Adata",
    "Apacer",


    # RAM / Component Brands
    "Corsair",
    "G.Skill",
    "Thermaltake",
    "Deepcool",
    "Cooler Master",
    "Antec",
    "NZXT",
    "AFOX",


    # Accessories
    "Logitech",
    "Razer",
    "Rapoo",
    "Fantech",
    "TP-Link",
    "D-Link",
    "Tenda",
    "Mercusys",


    # Others
    "Philips",
    "ViewSonic",
    "BenQ",
    "AOC",
    "Havit",
    "Redragon"

]


def extract_brand(name):

    name = name.lower()


    for brand in BRANDS:

        if brand.lower() in name:

            return brand


    return "Unknown"