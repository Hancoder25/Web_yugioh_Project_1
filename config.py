# config.py

DB_CONFIG = {
    'driver': 'ODBC Driver 17 for SQL Server',
    'server': 'LAPTOP-KU6TSMB4\HOANSQL',
    'database': 'yugiioh_images',
    'username': None,  # Đặt None nếu dùng Windows Authentication
    'password': None,  # Đặt None nếu dùng Windows Authentication
    'trusted_connection': 'yes'  # Sử dụng Windows Authentication
}


IMAGE_FOLDER = "./images"  # Thư mục lưu trữ ảnh tải về
SOURCE_URL = "https://ygoprodeck.com/card-database/"  # URL nguồn ảnh (thay bằng URL thực tế)
