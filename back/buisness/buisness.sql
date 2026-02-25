-- Iinterprétation écrit
--Identifie les clients qui dépensent le plus.
--Utile pour fidéliser les meilleurs clients ou proposer des offres personnalisées.

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
LIMIT 5;





 
-- Iinterprétation écrit
--Montre les produits les plus achetés.
--Permet de connaître les best-sellers et ajuster le stock ou les promotions.
select  p.ProductId,p.ProductName,SUM(od.Quantity) as TotalVendu
from Products p
join Order_Details od on p.ProductId = od.ProductId
group by p.ProductId, p.ProductName
ORDER BY TotalVendu DESC
LIMIT 3