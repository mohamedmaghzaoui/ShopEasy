-- fetch all users
SELECT * FROM Users
-- fetch one user with id 
SELECT * FROM Users WHERE UserId=?
-- create user
INSERT INTO Users (FirstName, LastName, Email, Address, Phone) VALUES (?, ?, ?, ?, ?)
--update user
UPDATE Users SET FirstName=?, LastName=?, Email=?, Address=?, Phone=? WHERE UserId=?
-- delete user
DELETE FROM Users WHERE UserId=?
