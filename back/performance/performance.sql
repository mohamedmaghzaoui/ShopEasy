
--index for this requete
-- SELECT u.UserId, FirstName, LastName, Email, Address, Phone
-- FROM Users u
-- LEFT JOIN Orders o
--     ON u.UserId = o.UserId
-- WHERE o.OrderId IS NULL;

CREATE INDEX idx_orders_userid ON Orders(UserId);



-- index for this request

-- SELECT p.ProductId, p.ProductName, SUM(od.Quantity) AS TotalVendu
-- FROM Products p
-- JOIN Order_Details od ON p.ProductId = od.ProductId
-- GROUP BY p.ProductId, p.ProductName
-- ORDER BY TotalVendu DESC
-- LIMIT 3;

CREATE INDEX idx_orderdetails_productid ON Order_Details(ProductId);




--additionel indexes
CREATE INDEX idx_products_categoryid ON Products(CategoryId);
CREATE INDEX idx_payments_orderid ON Payments(OrderId);
CREATE INDEX idx_orderdetails_orderid ON Order_Details(OrderId);


