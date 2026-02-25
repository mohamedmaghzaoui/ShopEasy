
--index pour cette requete metier 
-- select  p.ProductId,p.ProductName,SUM(od.Quantity) as TotalVendu
-- from Products p
-- join Order_Details od on p.ProductId = od.ProductId
-- group by p.ProductId, p.ProductName
-- ORDER BY TotalVendu DESC
-- LIMIT 3

CREATE INDEX idx_orderdetails_productid 
ON Order_Details(ProductId);


--index pour cette requete metier
-- SELECT 
--     u.UserId,
--     u.FirstName,
--     u.LastName,
--     SUM(od.Quantity * od.UnitPrice) AS TotalSpent,
--     COUNT(o.OrderId) AS NumberOfOrders
-- FROM Users u
-- JOIN Orders o 
--     ON u.UserId = o.UserId
-- JOIN Order_Details od 
--     ON o.OrderId = od.OrderId
-- GROUP BY u.UserId
-- ORDER BY TotalSpent DESC
-- LIMIT 5;
CREATE INDEX idx_orders_userid ON Orders(UserId);
CREATE INDEX idx_orderdetails_orderid ON Order_Details(OrderId);



--index additionel
CREATE INDEX idx_products_categoryid ON Products(CategoryId);
CREATE INDEX idx_payments_orderid ON Payments(OrderId);

