from database import get_connection

def get_top_clients():
    conn = get_connection()
    query = """
    SELECT 
        u.UserId,
        u.FirstName,
        u.LastName,
        SUM(od.Quantity * od.UnitPrice) AS TotalSpent,
        COUNT(o.OrderId) AS NumberOfOrders
    FROM Users u
    JOIN Orders o 
        ON u.UserId = o.UserId
    JOIN Order_Details od 
        ON o.OrderId = od.OrderId
    GROUP BY u.UserId
    ORDER BY TotalSpent DESC
    LIMIT 5
    """
    clients = conn.execute(query).fetchall()
    conn.close()
    return [dict(c) for c in clients]

def get_top_products():
    conn = get_connection()
    query = """
select  p.ProductId,p.ProductName,SUM(od.Quantity) as TotalVendu
from Products p
join Order_Details od on p.ProductId = od.ProductId
group by p.ProductId, p.ProductName
ORDER BY TotalVendu DESC
LIMIT 3
    """
    products = conn.execute(query).fetchall()
    conn.close()
    return [dict(p) for p in products]