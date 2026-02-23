from fastapi import APIRouter,HTTPException
import crud.user as user_crud
from model import UserRequest  
import query.queries as queries

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)



#query
@router.get("/without-orders")
def read_users_without_orders_route():
    return queries.get_users_without_order()

@router.get("/")
def read_users():
    return user_crud.get_users()

@router.get("/{user_id}")
def read_user(user_id: int):
    user=user_crud.get_user(user_id)
    if not user:
         raise HTTPException(status_code=404,detail="user not found") 
    
    return user_crud.get_user(user_id)


@router.post("/")
def add_user(user_data: UserRequest):
    user_crud.create_user(
            user_data.FirstName,
            user_data.LastName,
            user_data.Email,
            user_data.Address,
            user_data.Phone
        )
    return "user created"
    


@router.put("/{user_id}")
def update_user(user_id: int, user_data: UserRequest):
    user=user_crud.get_user(user_id)
    if not user:
         raise HTTPException(status_code=404,detail="user not found") 
    user_crud.update_user(
        user_id,
        user_data.FirstName,
        user_data.LastName,
        user_data.Email,
        user_data.Address,
        user_data.Phone
    )
    return "user updated"


@router.delete("/{user_id}")
def delete_user(user_id: int):
    user=user_crud.get_user(user_id)
    if not user:
         raise HTTPException(status_code=404,detail="user not found") 
    user_crud.delete_user(user_id)
    return "user deleteed"