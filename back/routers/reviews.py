# routers/reviews.py
from fastapi import APIRouter, HTTPException
import crud.review as review_crud
from model import ReviewRequest   # à créer si tu ne l'as pas encore

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)


# GET ALL
@router.get("/")
def read_reviews():
    return review_crud.get_reviews()


# GET BY ID
@router.get("/{review_id}")
def read_review(review_id: int):
    review = review_crud.get_review(review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review


# CREATE
@router.post("/")
def create_review_route(review: ReviewRequest):
    review_id = review_crud.create_review(
        review.UserId,
        review.ProductId,
        review.Rating,
        review.Comment,
        review.Created_At
    )
    return {"message": "Review created", "id": review_id}


# UPDATE
@router.put("/{review_id}")
def update_review_route(review_id: int, review: ReviewRequest):
    existing = review_crud.get_review(review_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Review not found")

    review_crud.update_review(
        review_id,
        review.UserId,
        review.ProductId,
        review.Rating,
        review.Comment,
        review.Created_At
    )
    return {"message": "Review updated"}


# DELETE
@router.delete("/{review_id}")
def delete_review_route(review_id: int):
    existing = review_crud.get_review(review_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Review not found")

    review_crud.delete_review(review_id)
    return {"message": "Review deleted"}