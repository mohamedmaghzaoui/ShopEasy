from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import create_database_from_sql
from routers import users,categories,products,orders,payments,reviews

app = FastAPI()

origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    create_database_from_sql("index.sql")
    print("Base de données créée ou mise à jour avec index.sql")
    
@app.get("/")
def root():
    return {"message": "API fonctionne !"}


# routes users
app.include_router(users.router)
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(reviews.router)
app.include_router(payments.router)
