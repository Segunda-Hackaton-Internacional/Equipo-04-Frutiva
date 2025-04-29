# schemas.py (ampliado)
from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime


class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    stock: int
    image_url: str


class ProductOut(ProductCreate):
    id: int
    is_active: bool
    created_at: datetime


class CartCreate(BaseModel):
    user_id: int


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    shipping_address: str


class Token(BaseModel):
    access_token: str
    token_type: str