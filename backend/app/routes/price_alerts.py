from fastapi import APIRouter
from app.database.mongodb import price_history_collection


router = APIRouter(
    prefix="/price-alerts",
    tags=["Price Alerts"]
)


@router.get("/")
def get_price_alerts():

    alerts = []

    histories = price_history_collection.find().sort(
        "_id",
        -1
    )


    for item in histories:

        old_price = item.get("old_price")
        new_price = item.get("new_price")


        if old_price and new_price:

            difference = new_price - old_price


            if difference != 0:

                alerts.append({

                    "name": item.get("name"),
                    "brand": item.get("brand"),

                    "old_price": old_price,
                    "new_price": new_price,

                    "change": difference,

                    "type": (
                        "decrease"
                        if difference < 0
                        else "increase"
                    )
                })


    return {
        "total_alerts": len(alerts),
        "alerts": alerts[:10]
    }