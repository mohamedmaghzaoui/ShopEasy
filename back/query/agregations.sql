-- get orders query
SELECT 
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
GROUP BY o.OrderId