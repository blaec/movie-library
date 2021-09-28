package com.blaec.movielibrary.repository.implementations;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

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
    public Movie getByTmdbId(String tmdbId) {
        return crudMovieRepository.findByTmdbId(tmdbId);
    }

    @Override
    public Iterable<Movie> getAllByType(Type type) {
        return crudMovieRepository.findAllByType(type);
    }

    @Override
    public Iterable<Movie> getAllByGenreId(Set<Integer> genres) {
        return crudMovieRepository.findAllByGenreId(genres);
    }

    @Override
    public Movie save(Movie movie) {
        return crudMovieRepository.save(movie);
    }

    @Override
    public void deleteById(int id) {
        crudMovieRepository.deleteById(id);
    }
}