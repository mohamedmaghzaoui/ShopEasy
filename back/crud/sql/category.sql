-- get categories
SELECT * FROM Categories;

-- get one category
SELECT * FROM Categories WHERE CategoryId=?;

-- create new category
INSERT INTO Categories (CategoryName) VALUES (?);

-- update a category
UPDATE Categories SET CategoryName=? WHERE CategoryId=?;

-- delete  a category
DELETE FROM Categories WHERE CategoryId=?;