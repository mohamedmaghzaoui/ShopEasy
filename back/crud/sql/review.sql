-- fetch all reviews
SELECT * FROM Reviews;
-- fetch one review with id
SELECT * FROM Reviews WHERE Id=?;
-- create review
INSERT INTO Reviews (UserId, ProductId, Rating, Comment, Created_At)
VALUES (?, ?, ?, ?, ?);
-- update review
UPDATE Reviews
SET UserId=?, ProductId=?, Rating=?, Comment=?, Created_At=?
WHERE Id=?;
-- delete review
DELETE FROM Reviews WHERE Id=?;
