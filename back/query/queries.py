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
    orders = conn.execute(""" select 
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
""").fetchall()
    conn.close()
    return [dict(order) for order in orders]

def get_categories_with_more_than_three_products():
    conn = get_connection()
    categories = conn.execute(""" select c.CategoryName ,p.CategoryId,count(p.ProductId) as totalProducts from Products p inner join Categories c on p.CategoryId=c.CategoryId 
group by c.CategoryId,c.CategoryName having totalProducts>3 """).fetchall()
    conn.close()
    return [dict(category) for category in categories]

def get_total_amount_by_category():
    conn = get_connection()
    categories = conn.execute(""" select c.CategoryName,c.CategoryId ,Sum(od.UnitPrice * od.Quantity) as totalAmount from Categories c 
left join Products p on c.CategoryId=p.CategoryId 
left join Order_Details od on od.ProductId=p.ProductId 
group by c.CategoryId,c.CategoryName
""").fetchall()
    conn.close()
    return [dict(category) for category in categories]



    