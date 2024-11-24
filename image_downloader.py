# image_downloader.py
import os
import requests
from config import IMAGE_FOLDER

def download_image(image_url, image_name):
    """Tải ảnh từ URL và lưu vào thư mục local."""
    if not os.path.exists(IMAGE_FOLDER):
        os.makedirs(IMAGE_FOLDER)

    image_path = os.path.join(IMAGE_FOLDER, image_name)
    try:
        response = requests.get(image_url, stream=True)
        if response.status_code == 200:
            with open(image_path, "wb") as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)
            return image_path
        else:
            print(f"Failed to download image: {image_url}")
            return None
    except Exception as e:
        print(f"Error downloading image: {e}")
        return None
