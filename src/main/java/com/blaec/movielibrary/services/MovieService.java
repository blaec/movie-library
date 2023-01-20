package com.blaec.movielibrary.services;

import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.object.Response;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

public interface MovieService {
    Iterable<Movie> getAll();
    Iterable<Movie> getAllByTypeMovie();
    Iterable<Movie> getAllByTypeWishlist();
    Iterable<Movie> getAllByGenres(Set<Integer> genres);
    Iterable<Movie> getAllExceptGenres(Set<Integer> genres);
    boolean isMovieExist(String tmdbId);
    @Transactional Response.Builder saveToWishlist(Optional<MovieTmdbTo> tmdbMovie);
    @Transactional Response.Builder saveToCollection(Optional<MovieTmdbTo> tmdbMovie, MovieFileTo movieFile);
    @Transactional Response.Builder updatePoster(Movie movie);
    @Transactional Response.Builder delete(String tmdbId);
}
