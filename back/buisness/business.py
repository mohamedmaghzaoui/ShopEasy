from database import get_connection

def get_top_clients(limit=5):
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
    LIMIT ?
    """
    clients = conn.execute(query, (limit,)).fetchall()
    conn.close()
    return [dict(c) for c in clients]