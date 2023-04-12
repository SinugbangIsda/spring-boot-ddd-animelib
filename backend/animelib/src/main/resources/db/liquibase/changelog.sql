-- liquibase formatted sql

-- changeset liquibase:1
CREATE TABLE IF NOT EXISTS user
(
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(30),
    first_name VARCHAR(30),
    password VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS anime
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(120),
    alt_title VARCHAR(120),
    type VARCHAR(7),
    episodes INT(4),
    status VARCHAR(30),
    genre VARCHAR(30),
    synopsis TEXT,
    image_uri TEXT
);

CREATE TABLE IF NOT EXISTS watchlist
(
    user_id BIGINT UNSIGNED,
    anime_id BIGINT UNSIGNED,
    PRIMARY KEY (user_id, anime_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (anime_id) REFERENCES anime(id)
);