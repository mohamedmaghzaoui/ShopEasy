    --inner join get products with categoryName
    select ProductId,ProductName,Price, Stock,Description,CategoryName from Products p inner join Categories c
    on p.CategoryId=c.CategoryId


    --left join get users without an order
    select u.UserId,FirstName,LastName,Email,Address,Phone from Users u left join Orders o on u.UserId=o.UserId where o.OrderId is null