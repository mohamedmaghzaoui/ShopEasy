-- get products
SELECT * FROM Products;

-- get one product
SELECT * FROM Products WHERE ProductId=?;

-- create new product
INSERT INTO Products (ProductName, Price, CategoryId, Stock)
VALUES (?, ?, ?, ?);

-- update a product
UPDATE Products 
SET ProductName=?, Price=?, CategoryId=?, Stock=?
WHERE ProductId=?;

-- delete product
DELETE FROM Products WHERE ProductId=?;