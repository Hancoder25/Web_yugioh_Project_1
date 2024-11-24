CREATE DATABASE yugiioh_images;

USE yugiioh_images;

CREATE TABLE images (
    id INT PRIMARY KEY IDENTITY(1,1),
    image_name NVARCHAR(255),
    image_path NVARCHAR(MAX)
);
