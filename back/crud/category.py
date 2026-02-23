from database import get_connection



def get_categories():
    conn = get_connection()
    categories = conn.execute("select * from Categories").fetchall()
    conn.close()
    return [dict(c) for c in categories]

def get_category(category_id):
    conn=get_connection()
    category=conn.execute("select * from Categories where categoryId =?",(category_id,)).fetchone()
    conn.close()
    if category:
        return dict(category)




def create_category(category_name):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Categories (CategoryName) VALUES (?)",
        (category_name,)
    )
    conn.commit()
    conn.close()



def update_category(category_id,category_name):
    conn = get_connection()
    conn.execute(
        "UPDATE Categories SET CategoryName=? WHERE CategoryId=?",
        (category_name, category_id)
    )
    conn.commit()
    conn.close()


def delete_category(category_id):
    conn = get_connection()
    conn.execute("DELETE FROM Categories WHERE CategoryId=?", (category_id,))
    conn.commit()
    conn.close()



