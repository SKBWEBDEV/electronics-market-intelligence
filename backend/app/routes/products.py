from fastapi import APIRouter, Query
from app.models.product import Product
from app.database.mongodb import products_collection


from app.services.analysis import (
    get_product_stats,
    get_trending_products,
    get_brand_stats,
    get_category_stats,
    get_price_drop_products,
    get_price_history,
    get_price_changes,
    get_demand_products
)



router = APIRouter(
    prefix="/products",
    tags=["Products"]
)





# Create Product
@router.post("/")
def create_product(product: Product):

    product_data = product.dict()


    result = products_collection.insert_one(
        product_data
    )


    return {

        "message": "Product saved successfully",

        "id": str(result.inserted_id)

    }







# Get Products with Pagination
@router.get("/")
def get_products(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: str = "",
    brand: str = "",
    category: str = ""
):

    skip = (page - 1) * limit


    query = {}


    if search:
        query["name"] = {
            "$regex": search,
            "$options": "i"
        }


    if brand:
        query["brand"] = brand


    if category:
        query["category"] = category



    total = products_collection.count_documents(query)



    products = list(
        products_collection.find(
            query,
            {
                "_id": 0
            }
        )
        .skip(skip)
        .limit(limit)
    )

    


    return {

        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit,
        "products": products

    }






# Product Statistics
@router.get("/stats")
def product_stats():

    return get_product_stats()








# Trending Products
@router.get("/trending")
def trending_products():

    return get_trending_products()








# Top Brands
@router.get("/top-brands")
def top_brands():

    return get_brand_stats()








# Category Analytics
@router.get("/category-stats")
def category_stats():

    return get_category_stats()








# Price Drop Products
@router.get("/price-drop")
def price_drop():

    return get_price_drop_products()






# Price History
@router.get("/price-history")
def price_history():

    return get_price_history()



@router.get("/demand")
def demand_products():

    return get_demand_products()




@router.get("/price-changes")
def price_changes():

    print("PRODUCT PRICE CHANGE ROUTE HIT")

    return get_price_changes()