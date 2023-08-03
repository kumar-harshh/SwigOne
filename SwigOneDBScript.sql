show databases;
create database myproject;
use myproject;
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    UNIQUE (email)
);
CREATE TABLE Restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(200) NOT NULL,
  cuisine VARCHAR(50) NOT NULL,
  contact_phone VARCHAR(20) DEFAULT NULL,
  contact_email VARCHAR(100)DEFAULT NULL,
  operating_hours VARCHAR(100) DEFAULT NULL,
  ratings DECIMAL(3, 1) DEFAULT 0.0 CHECK (ratings >= 0 AND ratings <= 5),
  price_range ENUM('low', 'medium', 'high') DEFAULT 'medium',
  latitude DECIMAL(10, 8) DEFAULT NULL,
  longitude DECIMAL(11, 8) DEFAULT NULL,
  has_outdoor_seating BOOLEAN DEFAULT false,
  has_wifi BOOLEAN DEFAULT false,
  is_wheelchair_accessible BOOLEAN DEFAULT false,
  photo_url VARCHAR(200) DEFAULT NULL,
  tags VARCHAR(200) DEFAULT NULL
);


CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    order_total DECIMAL(10,2) NOT NULL,
    delivery_status VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Drivers (
    driver_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);
CREATE TABLE Payment (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Rating (
    rating_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    rating INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Address (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    state VARCHAR(255) NOT NULL,
    city  VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE Menu (
    menu_id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
    );
select * from Users;
select * from Drivers;
show tables;
