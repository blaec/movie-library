package com.blaec.movielibrary.services;

import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.TmdbResult;
import com.blaec.movielibrary.utils.MovieUtils;
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

    /**
     * Save movie to database by combining data from json and file movie objects
     *
     * @param movieJson json movie
     * @param movieFile file movie
     */
    public void save(TmdbResult.TmdbMovie movieJson, MovieFileTo movieFile) {
        if (MovieUtils.isNullSave(movieJson, movieFile.toString())) {
            Movie newMovie = Movie.of(movieJson, movieFile);
            try {
                if (!movieFile.getName().equalsIgnoreCase(newMovie.getTitle())) {
                    String msg = String.format("tmdb-api returned wrong movie | %s -x-> %s", movieFile.getFileName(), newMovie.toString());
                    throw new IllegalArgumentException(msg);
                }
                Movie savedMovie = movieRepository.save(newMovie);
                log.info("saved | {}", savedMovie.toString());
            } catch (IllegalArgumentException e) {
                log.error(e.getMessage());
            } catch (DataIntegrityViolationException e) {
                log.error("this movie [{}] already exist", newMovie.toString());
            } catch (Exception e) {
                log.error(movieFile.toString(), e);
            }
        }
    }

    public Movie delete(Integer id) {
        Movie movie = null;
        try {
            movie = movieRepository.findById(id).get();
            Objects.requireNonNull(movie, "Movie to delete not exists");
            movieRepository.deleteById(id);
            log.info("movie {} with id {} deleted", movie.toString(), id);
        } catch (Exception e) {
            log.error("failed deleting movie by id: {}", id);
        }

        return movie;
    }
}