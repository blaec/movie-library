DROP TABLE IF EXISTS movies;

CREATE TABLE movies
(
    id          INT auto_increment,
    imdb_id     VARCHAR(15) 			    NOT NULL,
    title       VARCHAR(100) 			    NOT NULL,
    year        YEAR    					NOT NULL,
    rated       VARCHAR(10) 			    NOT NULL,
    runtime     SMALLINT        UNSIGNED    NOT NULL,
    genre       VARCHAR(100) 			    NOT NULL,
    actors      VARCHAR(200) 			    NOT NULL,
    language    VARCHAR(200) 			    NOT NULL,
    awards      VARCHAR(100) 			    NOT NULL,
    imdb_rating DECIMAL(3,1)    			NOT NULL,
    poster      VARCHAR(250) 			    NOT NULL,
    imdb_votes  INT 			UNSIGNED	NOT NULL,
    type		ENUM('movie', 'wish_list')	DEFAULT 'movie',
    updated     TIMESTAMP 					DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- file info
    resolution  ENUM('VGA', 'HD', 'FullHD'),
    size        DECIMAL(5,2)    			DEFAULT NULL,
    location    VARCHAR(100) 			    DEFAULT NULL,
    description VARCHAR(25) 			    DEFAULT NULL,
    frame_rate  TINYINT         UNSIGNED    DEFAULT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE movies AUTO_INCREMENT = 100000;
CREATE UNIQUE INDEX movies_unique_imdb_id_idx ON movies (imdb_id);