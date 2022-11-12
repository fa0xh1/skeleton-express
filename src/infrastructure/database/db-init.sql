create database skeleton-express;
use skeleton-express;

create table users(
id varchar(100) primary key,
email varchar(100) not null,
role_id int not null,
fullname varchar(150) null,
username varchar(100) not null unique,
password varchar(191) not null,
createdAt datetime,
updatedAt datetime
);