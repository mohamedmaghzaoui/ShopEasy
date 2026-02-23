# request_models.py
from pydantic import BaseModel
from typing import Optional


class UserRequest(BaseModel):
    FirstName: str
    LastName: str
    Email: str
    Address: Optional[str] = None
    Phone: Optional[str] = None


class CategoryRequest(BaseModel):
    CategoryName: str


class ProductRequest(BaseModel):
    ProductName: str
    Price: float
    Stock: Optional[int] = 0
    Description: Optional[str] = None
    CategoryId: Optional[int] = None


# class OrderRequest(BaseModel):
#     UserId: Optional[int] = None
#     OrderDate: str


# class OrderDetailRequest(BaseModel):
#     OrderId: Optional[int] = None
#     ProductId: Optional[int] = None
#     Quantity: int
#     UnitPrice: float


# class ReviewRequest(BaseModel):
#     UserId: Optional[int] = None
#     ProductId: Optional[int] = None
#     Rating: Optional[int] = None
#     Comment: Optional[str] = None
#     Created_At: Optional[str] = None


# class PaymentRequest(BaseModel):
#     OrderId: Optional[int] = None
#     PaymentMethod: Optional[str] = None
#     Amount: Optional[float] = None
#     PaymentDate: Optional[str] = None
#     Status: Optional[str] = None