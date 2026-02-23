--PRAGMA foreign_keys = ON;


INSERT INTO Users (FirstName, LastName, Email, Address, Phone) VALUES
('Jean', 'Luc', 'jean@mail.com', 'Paris', '0612345678'),
('Alice', 'Durand', 'alice@mail.com', 'Lyon', '0623456789'),
('Karim', 'Benali', 'karim@mail.com', 'Marseille', '0634567891'),
('Sophie', 'Martin', 'sophie@mail.com', 'Toulouse', '0645678912');




INSERT INTO Orders (UserId, OrderDate) VALUES
(1, '2026-02-20'),
(2, '2026-02-21'),
(3, '2026-02-21');


INSERT INTO Products (ProductName, Price, Stock, Description, CategoryId) VALUES
('PC Portable Asus', 899.99, 10, 'Laptop 16Go RAM SSD 512Go', 1),
('iPhone 13', 799.00, 15, 'Apple smartphone', 2),
('Souris Logitech', 25.50, 50, 'Wireless mouse', 3),
('Clavier mécanique RGB', 70.00, 20, 'Gaming keyboard', 4),
('Ecran 24 pouces', 149.99, 12, 'Full HD monitor', 1);



INSERT INTO Categories (CategoryName) VALUES
('Informatique'),
('Téléphone'),
('Accessoires'),
('Gaming');



INSERT INTO Order_Details (OrderId, ProductId, Quantity, UnitPrice) VALUES
(1, 1, 1, 899.99),
(1, 3, 2, 25.50),
(2, 2, 1, 799.00),
(2, 4, 1, 70.00),
(3, 5, 2, 149.99);


INSERT INTO Payments (OrderId, PaymentMethod, Amount, PaymentDate, Status) VALUES
(1, 'Carte Bancaire', 950.99, '2026-02-20', 'Payé'),
(2, 'PayPal', 869.00, '2026-02-21', 'Payé'),
(3, 'Carte Bancaire', 299.98, '2026-02-21', 'En attente');


INSERT INTO Reviews (UserId, ProductId, Rating, Comment, Created_At) VALUES
(1, 1, 5, 'Excellent produit !', '2026-02-21'),
(2, 2, 4, 'Très bon téléphone', '2026-02-21'),
(3, 3, 4, 'Bonne souris', '2026-02-20'),
(4, 4, 5, 'Parfait pour le gaming', '2026-02-19');


