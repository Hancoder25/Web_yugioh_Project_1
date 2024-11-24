# db.py
import pyodbc
from config import DB_CONFIG

def get_db_connection():
    if DB_CONFIG.get('trusted_connection') == 'yes':
        conn = pyodbc.connect(
            f"DRIVER={{{DB_CONFIG['driver']}}};"
            f"SERVER={DB_CONFIG['server']};"
            f"DATABASE={DB_CONFIG['database']};"
            "Trusted_Connection=yes;"
        )
    else:
        conn = pyodbc.connect(
            f"DRIVER={{{DB_CONFIG['driver']}}};"
            f"SERVER={DB_CONFIG['server']};"
            f"DATABASE={DB_CONFIG['database']};"
            f"UID={DB_CONFIG['username']};"
            f"PWD={DB_CONFIG['password']};"
        )
    return conn

def insert_image_data(image_name, image_path):
    """Thêm thông tin ảnh vào cơ sở dữ liệu."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        query = """
        INSERT INTO images (image_name, image_path)
        VALUES (?, ?)
        """
        cursor.execute(query, (image_name, image_path))
        conn.commit()
    except Exception as e:
        print(f"Error inserting data: {e}")
    finally:
        cursor.close()
        conn.close()
