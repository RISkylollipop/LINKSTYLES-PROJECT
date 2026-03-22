
-- Backup database
--  mysqldump -u root -p ecommerce_new > backup.sql
-- Enter password: ************

-- copy backedup database
-- mysql -h mysql-20708e10-dhammylahree-db0b.c.aivencloud.com -P 15490 -u avnadmin -p defaultdb < backup.sql
-- Enter password: ************************


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

-- Update as at 03/January/2026
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

-- drop table user_roles;
-- CREATE TABLE user_roles (
--     id INT NOT NULL AUTO_INCREMENT,
--     user_id INT NOT NULL,
--     role_id INT NOT NULL default 1,
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
-- CREATE TABLE cart (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   reference_id VARCHAR(150) NOT NULL,
--   items JSON NOT NULL,
--   amount DECIMAL(10,2) NOT NULL,
--   monnify_ref VARCHAR(150) NOT NULL,
--   email VARCHAR(100) NOT NULL,
--   full_name VARCHAR(100) NOT NULL,
--   status ENUM('PENDING', 'PAID', 'FAILED') DEFAULT 'PENDING',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- select * from products;
-- select * from cart;
-- select * from users;

-- select * from user_roles;
-- alter table user_roles
-- alter column role_id set default 1;
-- alter table user_roles
-- add column role_name varchar(20);
-- update user_roles
-- set role_name = "admin";


-- INSERT INTO user_roles (user_id, email)
-- SELECT id, email
-- FROM users where email = "kelanikdas1@gmail.com";
-- select * from user_roles;


-- SELECT user_id, profilepicture, first_name, lastname, middle_name, users.email, is_verified, user_roles.role_id, user_roles.role_name FROM users 
-- left join user_roles on users.id = user_roles.id WHERE users.email = "kelanikdas1@gmail.com";
-- select * from products;


-- create table feedbacks (
-- id int auto_increment primary key,
-- fullname varchar(150),
-- email varchar(200),
-- feedback text,
-- status varchar(20) default "unread"
-- );