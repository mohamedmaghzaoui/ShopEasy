from database import get_connection

# payments crud
def get_payments():
    conn = get_connection()
    payments = conn.execute("SELECT * FROM Payments").fetchall()
    conn.close()
    return [dict(p) for p in payments]

def get_payment(payment_id):
    conn = get_connection()
    payment = conn.execute(
        "SELECT * FROM Payments WHERE PaymentId=?",
        (payment_id,)
    ).fetchone()
    conn.close()
    return dict(payment) if payment else None

def create_payment(order_id, payment_method, amount, payment_date, status):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Payments (OrderId, PaymentMethod, Amount, PaymentDate, Status) VALUES (?, ?, ?, ?, ?)",  # pluriel
        (order_id, payment_method, amount, payment_date, status)
    )
    conn.commit()
    payment_id = cursor.lastrowid
    conn.close()
    return payment_id

def update_payment(payment_id, order_id, payment_method, amount, payment_date, status):
    conn = get_connection()
    conn.execute(
        "UPDATE Payments SET OrderId=?, PaymentMethod=?, Amount=?, PaymentDate=?, Status=? WHERE PaymentId=?",
        (order_id, payment_method, amount, payment_date, status, payment_id)
    )
    conn.commit()
    conn.close()

def delete_payment(payment_id):
    conn = get_connection()
    conn.execute("DELETE FROM Payments WHERE PaymentId=?", (payment_id,))
    conn.commit()
    conn.close()