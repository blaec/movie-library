package com.blaec.movielibrary.model.to;

import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Genre;
import com.blaec.movielibrary.model.Movie;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MovieTo {
    private Integer id;
    private String tmdbId;
    private String title;
    private String releaseDate;
    private String posterPath;
    private String posterPathRu;
    private Type type;
    private Resolution resolution;
    private String fileName;
    private Double size;
    private String location;
    private String description;
    private Integer frameRate;
    private LocalDate creationDate;
    private Set<Genre> genres;

    /**
     * This MovieTo is exact copy of Movie object but genres set nas no link to this object movie object
     *
     * @param movie Movie object
     * @return MovieTo object
     */
    public static MovieTo from(Movie movie) {
        Set<Genre> genres = movie.getGenres().stream()
                .map(g -> new Genre(g.getId(), g.getGenreId()))
                .collect(Collectors.toSet());

        return new MovieTo(
                movie.getId(),
                movie.getTmdbId(),
                movie.getTitle(),
                movie.getReleaseDate(),
                movie.getPosterPath(),
                movie.getPosterPathRu(),
                movie.getType(),
                movie.getResolution(),
                movie.getFileName(),
                movie.getSize(),
                movie.getLocation(),
                movie.getDescription(),
                movie.getFrameRate(),
                movie.getCreationDate(),
                genres
        );
    }
}
