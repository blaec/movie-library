DROP TABLE IF EXISTS movies;

CREATE TABLE movies
(
    id              INT auto_increment,
    tmdb_id         VARCHAR(15) 			    NOT NULL,
    title           VARCHAR(100) 			    NOT NULL,
    release_date    DATE     					NOT NULL,
    poster_path     VARCHAR(250) 			    NOT NULL,
    type		    ENUM('movie', 'wish_list')	DEFAULT 'movie',

    -- file info
    resolution      ENUM('VGA', 'HD', 'FullHD'),
    file_name       VARCHAR(100) 			    NOT NULL,
    size            DECIMAL(5,2)    			DEFAULT NULL,
    location        VARCHAR(100) 			    DEFAULT NULL,
    description     VARCHAR(25) 			    DEFAULT NULL,
    frame_rate      TINYINT         UNSIGNED    DEFAULT NULL,
    PRIMARY KEY     (id)
);
ALTER TABLE movies AUTO_INCREMENT = 100000;
CREATE UNIQUE INDEX movies_unique_tmdb_id_idx ON movies (tmdb_id);