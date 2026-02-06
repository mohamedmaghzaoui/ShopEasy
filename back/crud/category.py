from database import get_connection

def get_categories():
    conn = get_connection()
    categories = conn.execute("select * from Categories").fetchall()
    conn.close()
    return [dict(u) for u in categories]

def get_category(category_id):
    conn=get_connection()
    category=conn.execute("select * from Categories where categoryId =?",(category_id))
    conn.close()
    if category:
        return dict(category)
    else:
        return "category not found"



def create_category(category_name):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Categories (CategoryName) VALUES (?)",
        (category_name)
    )
    conn.commit()
    conn.close()
    return "Category created"


def update_category(category_id,category_name):
    conn = get_connection()
    conn.execute(
        "UPDATE Categories SET CategoryName=? WHERE CategoryId=?",
        (category_name, category_id)
    )
    conn.commit()
    conn.close()
    return 'Category modified'

def delete_user(category_id):
    conn = get_connection()
    conn.execute("DELETE FROM Users WHERE CategoryId=?", (category_id))
    conn.commit()
    conn.close()
    return "category deleted"


