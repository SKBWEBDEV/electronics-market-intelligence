from fastapi import APIRouter

from app.database.mongodb import price_history_collection


router = APIRouter(
    prefix="/products",
    tags=["Price Changes"]
)


@router.get("/price-changes")
def get_price_changes():

    data = list(
        price_history_collection
        .find({})
        .sort("date", -1)
        .limit(100)
    )


    for item in data:

        item["_id"] = str(item["_id"])


    return data