# routers/products.py
from fastapi import APIRouter, HTTPException
import crud.product as product_crud
from model import ProductRequest
import query.queries as queries

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

#query
@router.get("/with-categories")
def read_products_with_categories_route():
    return queries.get_products_with_categories()

#curd
@router.get("/")
def read_products():
    return product_crud.get_products()

@router.get("/{product_id}")
def read_product(product_id: int):
    product=product_crud.get_product(product_id)
    if not product:
         raise HTTPException(status_code=404,detail="product not found")
    return product

@router.post("/")
def add_product(product: ProductRequest):
    product_crud.create_product(
        product.ProductName,
        product.Price,
        product.Stock,
        product.Description,
        product.CategoryId
    )
    return "product created"

@router.put("/{product_id}")
def update_product_route(product_id: int, product: ProductRequest):
    product=product_crud.get_product(product_id)
    if not product:
         raise HTTPException(status_code=404,detail="product not found")

    product_crud.update_product(
        product_id,
        product.ProductName,
        product.Price,
        product.Stock,
        product.Description,
        product.CategoryId
    )
    return "product updated"

@router.delete("/{product_id}")
def delete_product_route(product_id: int):
    product=product_crud.get_product(product_id)
    if not product:
         raise HTTPException(status_code=404,detail="product not found")

    product_crud.delete_product(product_id)
    return "product deleted"

