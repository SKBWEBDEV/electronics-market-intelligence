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
        .find(
            {},
            {
                "_id": 0
            }
        )
        .sort(
            "date",
            -1
        )
        .limit(100)
    )


    return data