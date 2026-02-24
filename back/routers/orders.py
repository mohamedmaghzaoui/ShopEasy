from fastapi import APIRouter
import query.queries as queries
import transaction.transactions as transactions
from model import OrderRequest

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


#transaction

@router.post("/pay")
def pay_product_route(order:OrderRequest):
    return transactions.pay_product(order.UserId,order.ProductId,order.Quantity,order.PaymentMethod)

#query
@router.get("/")
def read_orders_route():
    return queries.get_orders()