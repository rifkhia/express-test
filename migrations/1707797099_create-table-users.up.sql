CREATE TABLE users(
    id varchar primary key ,
    username varchar(25) unique not null ,
    email varchar(50) unique not null ,
    password varchar not null
)