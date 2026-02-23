from database import get_connection

# reviews crud
def get_reviews():
    conn = get_connection()
    reviews = conn.execute("SELECT * FROM Reviews").fetchall()
    conn.close()
    return [dict(r) for r in reviews]

def get_review(review_id):
    conn = get_connection()
    review = conn.execute(
        "SELECT * FROM Reviews WHERE ReviewId=?",  # corrigé ici
        (review_id,)
    ).fetchone()
    conn.close()
    return dict(review) if review else None

def create_review(user_id, product_id, rating, comment=None, created_at=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Reviews (UserId, ProductId, Rating, Comment, Created_At) VALUES (?, ?, ?, ?, ?)",
        (user_id, product_id, rating, comment, created_at)
    )
    conn.commit()
    review_id = cursor.lastrowid
    conn.close()
    return review_id

def update_review(review_id, user_id, product_id, rating, comment=None, created_at=None):
    conn = get_connection()
    conn.execute(
        "UPDATE Reviews SET UserId=?, ProductId=?, Rating=?, Comment=?, Created_At=? WHERE ReviewId=?",  # corrigé ici
        (user_id, product_id, rating, comment, created_at, review_id)
    )
    conn.commit()
    conn.close()

def delete_review(review_id):
    conn = get_connection()
    conn.execute("DELETE FROM Reviews WHERE ReviewId=?", (review_id,))  # corrigé ici
    conn.commit()
    conn.close()