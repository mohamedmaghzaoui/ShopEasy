from fastapi import APIRouter,HTTPException
import query.queries as queries

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

#query
@router.get("/")
def read_orders_route():
    return queries.get_orders()