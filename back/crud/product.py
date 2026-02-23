# crud/product.py
from database import get_connection


def get_products():
    conn = get_connection()
    products = conn.execute("SELECT * FROM Products").fetchall()
    conn.close()
    return [dict(row) for row in products]


def get_product(product_id):
    conn = get_connection()
    product = conn.execute("SELECT * FROM Products WHERE ProductId=?", (product_id,)).fetchone()
    conn.close()
    if product:
        return dict(product)
  


def create_product(name, price, stock=0, description=None, category_id=None):
    conn = get_connection()
    conn.execute(
        "INSERT INTO Products (ProductName, Price, Stock, Description, CategoryId) VALUES (?, ?, ?, ?, ?)",
        (name, price, stock, description, category_id)
    )
    conn.commit()
    conn.close()



def update_product(product_id, name, price, stock=0, description=None, category_id=None):
    conn = get_connection()
    conn.execute(
        "UPDATE Products SET ProductName=?, Price=?, Stock=?, Description=?, CategoryId=? WHERE ProductId=?",
        (name, price, stock, description, category_id, product_id)
    )
    conn.commit()
    conn.close()



def delete_product(product_id):
    conn = get_connection()
    conn.execute(
        "DELETE FROM Products WHERE ProductId=?",
        (product_id,)
    )
    conn.commit()
    conn.close()
 