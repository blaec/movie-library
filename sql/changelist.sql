-- 2021-03-13
ALTER TABLE movies MODIFY file_name VARCHAR(100) DEFAULT NULL;

-- 2021-03-20
ALTER TABLE movies ADD genres VARCHAR(100) NOT NULL AFTER poster_path;

-- 2021-04-04
DROP TABLE IF EXISTS genres;
CREATE TABLE genres
(
    id       INT auto_increment,
    genre_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);
DROP TABLE IF EXISTS movies_genres;
CREATE TABLE movies_genres
(
    movie_id  INT NOT NULL,
    genres_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies (id),
    FOREIGN KEY (genres_id) REFERENCES genres (id)
);
ALTER TABLE movies DROP COLUMN genres;

-- 2021-06-11
ALTER TABLE movies
    ADD COLUMN created_date DATE DEFAULT (CURRENT_DATE);