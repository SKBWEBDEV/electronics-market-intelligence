from pydantic import BaseModel
from typing import Optional


class Product(BaseModel):
    name: str
    brand: Optional[str] = None
    category: Optional[str] = None

    price: float
    old_price: Optional[float] = None
    discount: Optional[str] = None

    rating: Optional[float] = None
    reviews: Optional[int] = None

    url: Optional[str] = None
    image: Optional[str] = None