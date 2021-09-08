package com.blaec.movielibrary.services;

import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.object.Response;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;

import java.util.Optional;
import java.util.Set;

public interface MovieService {
    Iterable<Movie> getAll();
    Iterable<Movie> getAllByTypeMovie();
    Iterable<Movie> getAllByTypeWishlist();
    Iterable<Movie> getAllByGenres(Set<Integer> genres);
    Response.Builder saveToWishlist(Optional<MovieTmdbTo> tmdbMovie);
    Response.Builder saveToCollection(Optional<MovieTmdbTo> tmdbMovie, MovieFileTo movieFile);
    Response.Builder delete(String tmdbId);
}
