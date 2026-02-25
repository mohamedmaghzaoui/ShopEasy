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
        VALUES (
            (SELECT OrderId FROM Orders ORDER BY OrderId DESC LIMIT 1),
            ?, ?, (SELECT Price FROM Products WHERE ProductId = ?)
        )
    """, (ProductId, Quantity, ProductId))

    # add pay
    cursor.execute("""
        INSERT INTO Payments (OrderId, PaymentMethod, Amount, PaymentDate, Status)
        VALUES (
            (SELECT OrderId FROM Orders ORDER BY OrderId DESC LIMIT 1),
            ?, 
            (SELECT Price * ? FROM Products WHERE ProductId = ?),
            DATE('now'),
            'Payé'
        )
    """, (PaymentMethod, Quantity, ProductId))
   
    cursor.execute("commit")
    conn.close()
    return "product payed"