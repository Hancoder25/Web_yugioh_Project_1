# tool.py
import requests
from bs4 import BeautifulSoup
from db import insert_image_data
from image_downloader import download_image
from config import SOURCE_URL

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def fetch_image_links():
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Chạy không giao diện
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    service = Service("D:\DESKTOP\Web_sale\chromedriver-win64/chromedriver.exe")
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:
        driver.get(SOURCE_URL)
        driver.implicitly_wait(100)  

        # Tìm tất cả thẻ <img> có class "lazy"
        image_elements = driver.find_elements(By.CSS_SELECTOR, "img.lazy")
        image_links = [img.get_attribute("src") for img in image_elements if img.get_attribute("src")]


        return image_links
    finally:
        driver.quit()




def main():
    """Hàm chính để tải ảnh và lưu thông tin vào cơ sở dữ liệu."""
    print("Fetching image links...")
    image_links = fetch_image_links()
  

    if not image_links:
        print("No images found.")
        return

    print(f"Found {len(image_links)} images. Starting download...")
    for idx, image_url in enumerate(image_links, start=1):
        image_name = image_url.split("/")[-1]  # Lấy tên ảnh từ URL
        print(f"Downloading {idx}/{len(image_links)}: {image_url}")
        image_path = download_image(image_url, image_name)

        if image_path:
            insert_image_data(image_name, image_path)
            print(f"Saved {image_name} to database.")
        else:
            print(f"Failed to save {image_name}.")

    print("Task completed.")

if __name__ == "__main__":
    main()
