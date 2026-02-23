# routers/payments.py
from fastapi import APIRouter, HTTPException
import crud.payment as payment_crud
from model import PaymentRequest

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

# GET ALL
@router.get("/")
def read_payments():
    return payment_crud.get_payments()

# GET BY ID
@router.get("/{payment_id}")
def read_payment(payment_id: int):
    payment = payment_crud.get_payment(payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

# CREATE
@router.post("/")
def create_payment_route(payment: PaymentRequest):
    payment_id = payment_crud.create_payment(
        payment.OrderId,
        payment.PaymentMethod,
        payment.Amount,
        payment.PaymentDate,
        payment.Status
    )
    return {"message": "Payment created", "id": payment_id}

# UPDATE
@router.put("/{payment_id}")
def update_payment_route(payment_id: int, payment: PaymentRequest):
    existing = payment_crud.get_payment(payment_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Payment not found")

    payment_crud.update_payment(
        payment_id,
        payment.OrderId,
        payment.PaymentMethod,
        payment.Amount,
        payment.PaymentDate,
        payment.Status
    )
    return {"message": "Payment updated"}

# DELETE
@router.delete("/{payment_id}")
def delete_payment_route(payment_id: int):
    existing = payment_crud.get_payment(payment_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Payment not found")

    payment_crud.delete_payment(payment_id)
    return {"message": "Payment deleted"}