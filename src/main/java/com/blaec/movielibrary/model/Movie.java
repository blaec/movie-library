package com.blaec.movielibrary.model;

import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.to.WishMovie;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "movies")
public class Movie{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    @Column(name="imdb_id")
    private String imdbId;

    @NonNull
    private String title;

    @NonNull
    private int year;

    @NonNull
    private String rated;

    @NonNull
    private int runtime;

    @NonNull
    private String genre;

    @NonNull
    private String actors;

    @NonNull
    private String language;

    @NonNull
    private String awards;

    @NonNull
    @Column(name="imdb_rating")
    private double imdbRating;

    @NonNull
    private String poster;

    @NonNull
    @Column(name="imdb_votes")
    private int imbdVotes;

    @NonNull
    @Enumerated(EnumType.STRING)
    private Type type;

    private Timestamp updated = new Timestamp(System.currentTimeMillis());

    @Enumerated(EnumType.STRING)
    private Resolution resolution;

    private Double size;

    private String location;

    private String description;

    @Column(name="frame_rate")
    private Integer frameRate;

    public static Movie from(WishMovie wishMovie) {
        Movie movie = new Movie();
        movie.setImdbId(wishMovie.getImdbId());
        movie.setTitle(wishMovie.getTitle());
        movie.setYear(wishMovie.getYear());
        movie.setRated(wishMovie.getRated());
        movie.setRuntime(wishMovie.getRuntime());
        movie.setGenre(wishMovie.getGenre());
        movie.setActors(wishMovie.getActors());
        movie.setLanguage(wishMovie.getLanguage());
        movie.setAwards(wishMovie.getAwards());
        movie.setImdbRating(wishMovie.getImdbRating());
        movie.setPoster(wishMovie.getPoster());
        movie.setImbdVotes(wishMovie.getImbdVotes());
        movie.setType(Type.wish_list);
        return movie;
    }
}
