from fastapi import HTTPException
from database import get_connection


def pay_product(UserId, ProductId, Quantity, PaymentMethod):
    
    conn = get_connection()
    cursor = conn.cursor()
    conn.execute("BEGIN")

    # verify stock
    cursor.execute("""
            UPDATE Products
            SET Stock = Stock - ?
            WHERE ProductId = ? AND Stock >= ?
        """, (Quantity, ProductId, Quantity))
    if cursor.rowcount == 0:
       conn.rollback()
       raise HTTPException(status_code=400, detail="no stock")

     # 2 add order
    cursor.execute("""
            INSERT INTO Orders (UserId, OrderDate)
            VALUES (?, DATE('now'))
        """, (UserId,))
    order_id = cursor.lastrowid

     # add order detail
    cursor.execute("""
            INSERT INTO Order_Details (OrderId, ProductId, Quantity, UnitPrice)
            SELECT ?, ProductId, ?, Price
            FROM Products
            WHERE ProductId = ?
    """, (order_id, Quantity, ProductId))

    # add pay
    cursor.execute("""
            INSERT INTO Payments (OrderId, PaymentMethod, Amount, PaymentDate, Status)
            SELECT ?, ?, Price * ?, DATE('now'), 'Payé'
            FROM Products
            WHERE ProductId = ?
    """, (order_id, PaymentMethod, Quantity, ProductId))
   
    cursor.execute("commit")
    conn.close()
    return "product payed"