package com.blaec.movielibrary.repository.immemory;

import com.blaec.movielibrary.MovieTestData;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Repository
public class InMemoryMovieRepository implements MovieRepository {
    Map<Integer, Movie> repository = new ConcurrentHashMap<>();

    {
        MovieTestData.WISH_MOVIES.forEach(movie -> repository.put(movie.getId(), movie));
        MovieTestData.MOVIES.forEach(movie -> repository.put(movie.getId(), movie));
    }


    @PostConstruct
    public void postConstruct() {
        log.info("+++ PostConstruct");
    }

    @PreDestroy
    public void preDestroy() {
        log.info("+++ PreDestroy");
    }

    @Override
    public Iterable<Movie> getAll() {
        return repository.values();
    }

    @Override
    public Movie getByTmdbId(String tmdbId) {
        return repository.values().stream()
                .filter(movie -> movie.getTmdbId().equals(tmdbId))
                .findFirst()
                .orElse(null);
    }

    @Override
    public Iterable<Movie> getAllByType(Type type) {
        return repository.values().stream()
                .filter(movie -> movie.getType() == type)
                .collect(Collectors.toList());
    }

    @Override
    public Iterable<Movie> getAllByGenreId(Set<Integer> genres) {
        return null;
    }

    @Override
    public Movie save(Movie movie) {
        repository.put(movie.getId(), movie);
        return repository.get(movie.getId());
    }

    @Override
    public void deleteById(int id) {
        repository.remove(id);
    }
}
