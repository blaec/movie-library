package com.blaec.movielibrary.repository;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;

import java.util.Optional;
import java.util.Set;

public interface MovieRepository {
    Iterable<Movie> getAll();
    Optional<Movie> getByTmdbId(String tmdbId);
    Iterable<Movie> getAllByType(Type type);
    Iterable<Movie> getAllByGenreId(Set<Integer> genres);
    Optional<Movie> save(Movie movie);
    boolean delete(int id);
}
