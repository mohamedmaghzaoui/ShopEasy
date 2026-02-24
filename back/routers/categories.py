from fastapi import APIRouter,HTTPException
import crud.category as category_crud
import query.queries as queries


from model import CategoryRequest

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

#query

@router.get("/with-more-than-three-products")
def read_categories_query_route():
    return queries.get_categories_with_more_than_three_products()

@router.get("/total-amount")
def rad_total_amount_by_category():
    return queries.get_total_amount_by_category()

#crud
@router.get("/")
def read_categories_route():
    return category_crud.get_categories()

@router.get("/{category_id}")
def read_category_route(category_id: int):
    category=category_crud.get_category(category_id)
    if not category:
        raise HTTPException(status_code=404,detail="category not found")
        
    return category

@router.post("/")
def add_category_route(category_data:CategoryRequest):
    category_crud.create_category(category_data.CategoryName)
    return "category created"

@router.put("/{category_id}")
def update_category_route(category_id: int,category_data:CategoryRequest):
    category=category_crud.get_category(category_id)
    if not category:
        raise HTTPException(status_code=404,detail="category not found")
    
    category_crud.update_category(category_id, category_data.CategoryName)
    return "category updated"

@router.delete("/{category_id}")
def delete_category_route(category_id: int):
    category=category_crud.get_category(category_id)
    if not category:
        raise HTTPException(status_code=404,detail="category not found")
    
    category_crud.delete_category(category_id)
    return "category deleted"

#queries




