from fastapi import APIRouter
import crud.user as user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/")
def read_users():
    return user.get_users()

@router.get("/{user_id}")
def read_user(user_id: int):
    return user.get_user(user_id)

@router.post("/")
def add_user(
    firstname: str,
    lastname: str,
    email: str,
    address: str = None,
    phone: str = None
):
    return {
        "UserId": user.create_user(firstname, lastname, email, address, phone)
    }

@router.put("/{user_id}")
def update_user(
    user_id: int,
    firstname: str,
    lastname: str,
    email: str,
    address: str = None,
    phone: str = None
):
    user.update_user(user_id, firstname, lastname, email, address, phone)
    return {"message": "User updated"}

@router.delete("/{user_id}")
def delete_user(user_id: int):
    user.delete_user(user_id)
    return {"message": "User deleted"}
