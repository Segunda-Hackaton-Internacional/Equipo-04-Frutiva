# main.py (ampliado)
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import User, Product, Cart, CartItem, Order, OrderItem
from schemas import UserCreate, UserOut, ProductCreate, ProductOut, CartItemCreate, OrderCreate
from utils import (
    get_hashed_password,
    verify_password,
    create_access_token,
    JWTBearer
)

Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependencia de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Endpoints de usuarios (mantener los existentes y añadir)
@app.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):


# mantener lógica existente de registro

@app.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):


# Mantener lógica existente de login

# Endpoints de productos
@app.post("/products", dependencies=[Depends(JWTBearer())], response_model=ProductOut)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@app.get("/products", response_model=list[ProductOut])
def get_products(category: str = None, db: Session = Depends(get_db)):
    query = db.query(Product).filter(Product.is_active == True)
    if category:
        query = query.filter(Product.category == category)
    return query.all()


# Endpoints del carrito
@app.post("/cart", dependencies=[Depends(JWTBearer())])
def add_to_cart(item: CartItemCreate, db: Session = Depends(get_db)):
    # Lógica para agregar productos al carrito
    pass


# Endpoints de órdenes
@app.post("/orders", dependencies=[Depends(JWTBearer())])
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    # Lógica para crear una orden
    pass


# Endpoints administrativos
@app.get("/admin/users", dependencies=[Depends(JWTBearer())])
def get_all_users(db: Session = Depends(get_db)):
    # Verificar si el usuario es admin
    return db.query(User).all()