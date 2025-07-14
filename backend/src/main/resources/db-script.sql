CREATE TABLE IF NOT EXISTS Users (
user_id SERIAL,
user_name VARCHAR(255),
user_email VARCHAR(255) UNIQUE NOT NULL,
user_password VARCHAR NOT NULL,
PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS URL (
short_url VARCHAR NOT NULL UNIQUE,
original_url VARCHAR NOT NULL,
user_id INT,
creation TIMESTAMP,
expiration TIMESTAMP,
number_of_clicks INT,
PRIMARY KEY (short_url),
FOREIGN KEY (user_id) REFERENCES Users(user_ID)
    );