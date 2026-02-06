-- fetch all payments
SELECT * FROM Payment;
-- fetch one payment with id
SELECT * FROM Payment WHERE PaymentId=?;
-- create payment
INSERT INTO Payment (OrderId, PaymentMethod, Amount, PaymentDate, Status)
VALUES (?, ?, ?, ?, ?);
-- update payment
UPDATE Payment
SET OrderId=?, PaymentMethod=?, Amount=?, PaymentDate=?, Status=?
WHERE PaymentId=?;
-- delete payment
DELETE FROM Payment WHERE PaymentId=?;
