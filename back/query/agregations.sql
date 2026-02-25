-- get orders query
select 
    o.OrderId,
    o.OrderDate,
    u.FirstName,
    u.LastName,
    SUM(od.Quantity * od.UnitPrice) as TotalAmount,
    SUM(od.Quantity) as TotalItems,
    p.Status as PaymentStatus,
    p.PaymentMethod
from Orders o
join Users u 
    on o.UserId = u.UserId
join Order_Details od 
    on o.OrderId = od.OrderId
left join Payments p
    on o.OrderId = p.OrderId
group by o.OrderId,o.OrderDate,u.FirstName,u.LastName,p.Status,p.PaymentMethod


-- get categories with more than 3 products 
select c.CategoryName ,p.CategoryId,count(p.ProductId) as totalProducts from Products p inner join Categories c on p.CategoryId=c.CategoryId 
group by c.CategoryId,c.CategoryName having totalProducts>3



-- get total amount by category
select c.CategoryName,c.CategoryId ,Sum(od.UnitPrice * od.Quantity) as totalAmount from Categories c 
left join Products p on c.CategoryId=p.CategoryId 
inner join Order_Details od on od.ProductId=p.ProductId 
group by c.CategoryId,c.CategoryName


