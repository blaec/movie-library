package com.blaec.movielibrary.services;

import com.blaec.movielibrary.enums.Language;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.Response;
import com.blaec.movielibrary.to.TmdbResult;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

public interface MovieService {
    Iterable<Movie> getAll();
    Iterable<Movie> getAllByTypeMovie();
    Iterable<Movie> getAllByTypeWishlist();
    Iterable<Movie> getAllByGenres(Set<Integer> genres);
    Response.Builder saveToWishlist(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies);
    Response.Builder saveToCollection(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies, MovieFileTo movieFile);
    Response.Builder delete(String tmdbId);
}
