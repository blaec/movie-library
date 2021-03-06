package com.blaec.movielibrary.services;

import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import com.blaec.movielibrary.to.MovieFileTo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@AllArgsConstructor
@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public Iterable<Movie> getAll() {
        return movieRepository.findAll();
    }

    public void save(Movie movie, MovieFileTo movieFile) {
        try {
            Objects.requireNonNull(movie, String.format("sent null value with movie: %s", movieFile.toString()));
            if (!movieFile.getName().equalsIgnoreCase(movie.getTitle())) {
                throw new IllegalArgumentException(String.format("trying to save wrong movie %s -> %s", movieFile.getFileName(), movie.toString()));
            }
            movieRepository.save(movie);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
        } catch (DataIntegrityViolationException e) {
            log.error("this movie [{}] already exist", movie.toString());
        } catch (Exception e) {
            log.error(movieFile.toString(), e);
        }
    }

    public Movie delete(Integer id){
        Movie movie = null;
        try {
            movie = movieRepository.findById(id).get();
            Objects.requireNonNull(movie, "Movie to delete not exists");
            movieRepository.deleteById(id);
        } catch (Exception e) {
            log.error("failed deleting movie by id: {}", id);
        }
        return movie;
    }
}
