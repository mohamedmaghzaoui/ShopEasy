-- L’utilisateur 1 achète 2 unités du produit 16 et paye par carte bancaire.

begin;


update Products
set Stock = Stock - 2
where ProductId = 16;

insert into Orders (UserId, OrderDate)
VALUES (1, DATE('now'));

insert into Order_Details (OrderId, ProductId, Quantity, UnitPrice)
select last_insert_rowid(), ProductId, 2, Price
from Products
where ProductId = 16;

insert into Payments (OrderId, PaymentMethod, Amount, PaymentDate, Status)
select last_insert_rowid(), 'Carte Bancaire', Price*2, DATE('now'), 'Payé'
from Products
where ProductId = 16;

commit;

