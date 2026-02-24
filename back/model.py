# request_models.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

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

class ReviewRequest(BaseModel):
    UserId: int
    ProductId: int
    Rating: int
    Comment: Optional[str] = None
    Created_At: Optional[datetime] = None


class PaymentRequest(BaseModel):
    OrderId: int
    PaymentMethod: str
    Amount: float
    PaymentDate: Optional[datetime] = None
    Status: str
    
class OrderRequest(BaseModel):
    UserId: int
    ProductId: int
    Quantity: int
    PaymentMethod: str


