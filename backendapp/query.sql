-- create database ecommerce_new;
-- use ecommerce_new;

-- drop table user_roles;
-- drop table roles;
-- drop table users;

-- CREATE TABLE users (
--     id INT NOT NULL AUTO_INCREMENT,
--     profilepicture VARCHAR(500),

--     first_name VARCHAR(100) NOT NULL,
--     lastname VARCHAR(100) NOT NULL,
--     middle_name VARCHAR(100),

--     email VARCHAR(150) NOT NULL UNIQUE,
--     phone_number VARCHAR(20) NOT NULL,

--     password VARCHAR(255) NOT NULL,

--     address VARCHAR(255) NOT NULL,
--     city VARCHAR(100) NOT NULL,
--     state VARCHAR(100) NOT NULL,
--     country VARCHAR(100) NOT NULL,
--     nearest_landmark VARCHAR(150),

--     is_verified TINYINT(1) DEFAULT 0,
--     jwt_version INT DEFAULT 1,

--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

--     PRIMARY KEY (id)
-- );

-- CREATE TABLE roles (
--     id INT NOT NULL AUTO_INCREMENT,
--     role_name VARCHAR(50) NOT NULL UNIQUE,
--     description VARCHAR(255),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE user_roles (
--     id INT NOT NULL AUTO_INCREMENT,
--     user_id INT NOT NULL,
--     role_id INT NOT NULL,
--     assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
-- );
-- INSERT INTO roles (role_name, description) VALUES
-- ('user', 'Normal user'),
-- ('admin', 'Site admin'),
-- ('super_admin', 'Full access');

-- show tables;
-- select * from users;

-- CREATE TABLE delivery_details (
--     id INT AUTO_INCREMENT PRIMARY KEY,

--     -- User Delivery Information
--     full_name VARCHAR(150) NOT NULL,
--     phone_number VARCHAR(20) NOT NULL,
--     email VARCHAR(150),

--     street_address VARCHAR(255) NOT NULL,
--     city VARCHAR(100) NOT NULL,
--     state VARCHAR(100) NOT NULL,
--     country VARCHAR(100) NOT NULL,
--     delivery_note TEXT,

--     -- Payment type selected on frontend ("Payment on Delivery", "Paid Online", etc.)
--     payment_type VARCHAR(50) DEFAULT 'Payment On Delivery',

--     -- Optional: link record to orders table later
--     order_id INT NULL,
--     
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- drop table products;
-- create table products (
-- product_id int primary key auto_increment,
--  productName varchar (250) not null,
--  category varchar (250) not null,
-- description text not null,
-- price decimal (12, 2) not null,
-- stock int default 1,
-- image1 text,
-- image2 text,
-- image3 text,
-- created_time datetime default current_timestamp 
-- );



-- DROP TABLE CART;
-- create table cart(
--  monnify_ref varchar (200),
--  reference_id varchar (150),
--  amount int,
--  status varchar (200) default "PENDING"
-- );
