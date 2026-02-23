-- get users
SELECT * FROM Users
-- get one user 
SELECT * FROM Users WHERE UserId=?
-- create new user
INSERT INTO Users (FirstName, LastName, Email, Address, Phone) VALUES (?, ?, ?, ?, ?)
--update a user
UPDATE Users SET FirstName=?, LastName=?, Email=?, Address=?, Phone=? WHERE UserId=?
-- delete user
DELETE FROM Users WHERE UserId=?
