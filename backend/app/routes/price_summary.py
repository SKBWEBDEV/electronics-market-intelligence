from fastapi import APIRouter

from app.database.mongodb import price_history_collection


router = APIRouter(
    prefix="/products",
    tags=["Price Summary"]
)


@router.get("/price-summary")
def get_price_summary():


    increase = price_history_collection.count_documents(
        {
            "change_type": "increase"
        }
    )


    decrease = price_history_collection.count_documents(
        {
            "change_type": "decrease"
        }
    )


    total_changes = price_history_collection.count_documents({})


    stable = 100 - total_changes


    if stable < 0:
        stable = 0



    return {

        "increase": increase,

        "decrease": decrease,

        "stable": stable

    }