package com.blaec.movielibrary.repository.implementations;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Slf4j
@AllArgsConstructor
@Repository
public class MovieRepositoryImpl implements MovieRepository {
    private final CrudMovieRepository crudMovieRepository;

    @Override
    public Iterable<Movie> getAll() {
        return crudMovieRepository.findAll();
    }

    @Override
    public Optional<Movie> getByTmdbId(String tmdbId) {
        return crudMovieRepository.findByTmdbId(tmdbId);
    }

    @Override
    public Iterable<Movie> getAllByType(Type type) {
        return crudMovieRepository.findAllByType(type);
    }

    @Override
    public Iterable<Movie> getAllWithGenreIds(Set<Integer> genres) {
        return crudMovieRepository.findAllWithGenres(genres);
    }

    @Override
    public Iterable<Movie> getAllWithoutGenreIds(Set<Integer> genres) {
        return crudMovieRepository.findAllWithoutGenres(genres);
    }

    @Override
    public Iterable<Movie> getAllFilteringByGenres(Set<Integer> includeGenres, Set<Integer> excludeGenres) {
        return crudMovieRepository.findAllFilteringByGenres(includeGenres, excludeGenres);
    }

    @Override
    public Optional<Movie> save(Movie movie) {
        return Optional.of(crudMovieRepository.save(movie));
    }

    @Override
    public void delete(Movie movie) {
        movie.removeGenres();
        crudMovieRepository.delete(movie);
    }
}
