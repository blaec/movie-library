package com.blaec.movielibrary.repository;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;

import java.util.Optional;
import java.util.Set;

public interface MovieRepository {
    Iterable<Movie> getAll();
    Optional<Movie> getByTmdbId(String tmdbId);
    Iterable<Movie> getAllByType(Type type);
    Iterable<Movie> getAllWithGenreIds(Set<Integer> genres);
    Iterable<Movie> getAllWithoutGenreIds(Set<Integer> genres);
    Iterable<Movie> getAllFilteringByGenres(Set<Integer> includeGenres, Set<Integer> excludeGenres);
    Optional<Movie> save(Movie movie);
    void delete(Movie movie);
}
