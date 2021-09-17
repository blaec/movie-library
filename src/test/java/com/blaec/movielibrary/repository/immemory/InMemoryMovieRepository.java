package com.blaec.movielibrary.repository.immemory;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryMovieRepository implements MovieRepository {
    Map<Integer, Movie> repository = new ConcurrentHashMap<>();

    @Override
    public Iterable<Movie> getAll() {
        return null;
    }

    @Override
    public Movie getByTmdbId(String tmdbId) {
        return null;
    }

    @Override
    public Iterable<Movie> getAllByType(Type type) {
        return null;
    }

    @Override
    public Iterable<Movie> getAllByGenreId(Set<Integer> genres) {
        return null;
    }

    @Override
    public Movie save(Movie movie) {
        return null;
    }

    @Override
    public void deleteById(int id) {

    }
}
