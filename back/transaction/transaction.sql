-- L’utilisateur 1 achète 2 unités du produit 16 et paye par carte bancaire.

begin;
update Products
set Stock = Stock - 2
where ProductId = 16
AND Stock >= 2;

insert into Orders (UserId, OrderDate)
values (1, DATE('now'));

insert into Order_Details (OrderId, ProductId, Quantity, UnitPrice)
values (
    (select OrderId from Orders order by OrderId desc limit 1),
    16,
    2,
    (select Price from Products where ProductId = 16)
);

insert into Payments (OrderId, PaymentMethod, Amount, PaymentDate, Status)
values (
    (select OrderId from Orders order by OrderId desc limit 1),
    'Carte Bancaire',
    (select Price*2 from Products where ProductId = 16),
    DATE('now'),
    'Payé'
);

commit;








