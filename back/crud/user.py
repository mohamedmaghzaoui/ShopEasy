from database import get_connection

# user curd
def get_users():
    conn = get_connection()
    users = conn.execute("SELECT * FROM User").fetchall()
    conn.close()
    return [dict(u) for u in users]

def get_user(user_id):
    conn = get_connection()
    user = conn.execute("SELECT * FROM User WHERE UserId=?", (user_id,)).fetchone()
    conn.close()
    return dict(user) if user else None

def create_user(firstname, lastname, email, address=None, phone=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO User (FirstName, LastName, Email, Address, Phone) VALUES (?, ?, ?, ?, ?)",
        (firstname, lastname, email, address, phone)
    )
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()
    return user_id

def update_user(user_id, firstname, lastname, email, address=None, phone=None):
    conn = get_connection()
    conn.execute(
        "UPDATE User SET FirstName=?, LastName=?, Email=?, Address=?, Phone=? WHERE UserId=?",
        (firstname, lastname, email, address, phone, user_id)
    )
    conn.commit()
    conn.close()

def delete_user(user_id):
    conn = get_connection()
    conn.execute("DELETE FROM User WHERE UserId=?", (user_id,))
    conn.commit()
    conn.close()

