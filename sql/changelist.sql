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
    ADD COLUMN creation_date DATE DEFAULT (CURRENT_DATE);

-- 2021-07-23
ALTER TABLE movies
    MODIFY COLUMN `resolution` ENUM( 'VGA', 'HD', 'FullHD', 'QHD', 'UHD4K' );

-- 2021-07-30
ALTER TABLE movies
    ADD COLUMN poster_path_ru VARCHAR(250) NOT NULL AFTER poster_path;

-- 2021-08-06
SET SQL_SAFE_UPDATES = 0;
UPDATE movies
   SET `location` = REPLACE(`location`, 'l_movies', 'n_movies')
 WHERE `location` LIKE '%l_movies%';
-- changes m_serial_movies to m_serian_movies

-- 2023-01-20
-- Only 2 tables remains: movies + genres, when movies w/o changes and genres: id, genre_id [specified in tmdb], movie_id [from movie table]