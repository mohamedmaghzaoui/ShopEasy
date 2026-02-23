from database import get_connection


def get_products_with_categories():
    conn = get_connection()
    products = conn.execute(""" select ProductId,ProductName,Price, Stock,Description,CategoryName from Products p inner join Categories c
on p.CategoryId=c.CategoryId """).fetchall()
    conn.close()
    return [dict(row) for row in products]

def get_users_without_order():
    conn = get_connection()
    users = conn.execute(""" select u.UserId,FirstName,LastName,Email,Address,Phone from Users u left join Orders o on u.UserId=o.UserId 
    where o.OrderId is null """).fetchall()
    conn.close()
    return [dict(user) for user in users]

def get_orders():
    conn = get_connection()
    orders = conn.execute(""" SELECT 
    o.OrderId,
    o.OrderDate,
    u.FirstName,
    u.LastName,
    SUM(od.Quantity * od.UnitPrice) AS TotalAmount,
    SUM(od.Quantity) AS TotalItems,
    p.Status AS PaymentStatus
FROM Orders o
JOIN Users u 
    ON o.UserId = u.UserId
JOIN Order_Details od 
    ON o.OrderId = od.OrderId
LEFT JOIN Payments p
    ON o.OrderId = p.OrderId
GROUP BY o.OrderId""").fetchall()
    conn.close()
    return [dict(order) for order in orders]