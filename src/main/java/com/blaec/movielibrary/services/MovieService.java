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
                // FIXME not correct check
                if (!movieFile.getName().equalsIgnoreCase(newMovie.getTitle())) {
                    log.warn("check if it's correct | {} -x-> {}}", newMovie.toString(), movieFile.getFileName());
                }
                Movie savedMovie = movieRepository.save(newMovie);
                log.info("saved | {}", savedMovie.toString());
            } catch (DataIntegrityViolationException e) {
                log.error("this movie [{}] already exist", newMovie.toString());
            } catch (Exception e) {
                log.error(movieFile.toString(), e);
            }
        }
    }

    public void delete(Integer id) {
        try {
            Movie movie = movieRepository.findById(id).orElse(null);
            if (movie == null) {
                log.warn("No movie with id {} exists", id);
            } else {
                movieRepository.deleteById(id);
                log.info("movie {} with id {} deleted", movie.toString(), id);
            }
        } catch (IllegalArgumentException e) {
            log.error("can't delete movie, wrong id: {}", id);
        } catch (Exception e) {
            log.error("failed deleting movie by id: {}", id);
        }
    }
}
