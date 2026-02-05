import sqlite3

DATABASE = "./shopeasy.db"

def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  
    return conn

def create_database_from_sql(sql_file="index.sql"):
    with open(sql_file, "r") as f:
        sql_script = f.read()

    conn = get_connection()
    conn.executescript(sql_script) 
    conn.commit()
    conn.close()
