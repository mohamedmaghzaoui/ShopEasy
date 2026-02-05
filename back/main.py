from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_database_from_sql
import crud.user as user

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
    print("Base de données créée ou mise à jour depuis index.sql")
    
@app.get("/")
def root():
    return {"message": "API fonctionne !"}

@app.get("/users")
def read_users():
    return user.get_users()

@app.get("/users/{user_id}")
def read_user(user_id: int):
    return user.get_user(user_id)

@app.post("/users")
def add_user(firstname: str, lastname: str, email: str, address: str = None, phone: str = None):
    return {"UserId": user.create_user(firstname, lastname, email, address, phone)}

@app.put("/users/{user_id}")
def update_user(user_id: int, firstname: str, lastname: str, email: str, address: str = None, phone: str = None):
    user.update_user(user_id, firstname, lastname, email, address, phone)
    return {"message": "User updated"}

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    user.delete_user(user_id)
    return {"message": "User deleted"}

