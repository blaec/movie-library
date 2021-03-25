-- 2021-03-13
ALTER TABLE movies MODIFY file_name VARCHAR(100) DEFAULT NULL;

-- 2021-03-20
ALTER TABLE movies ADD genres VARCHAR(100) NOT NULL AFTER poster_path;

-- 2021-03-21
DROP TABLE IF EXISTS movie_genres;
CREATE TABLE movie_genres
(
    id  		INT auto_increment,
    tmdb_id     VARCHAR(15)         NOT NULL,
    genre_id    TINYINT UNSIGNED    NOT NULL,
    PRIMARY KEY     (id),
    CONSTRAINT  movie_genres_idx    UNIQUE (tmdb_id, genre_id),
    FOREIGN KEY (tmdb_id) REFERENCES movies (tmdb_id) ON DELETE CASCADE
);