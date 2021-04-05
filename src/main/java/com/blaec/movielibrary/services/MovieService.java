package com.blaec.movielibrary.services;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.TmdbResult;
import com.blaec.movielibrary.utils.MovieUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@AllArgsConstructor
@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public Iterable<Movie> getAll() {
        return movieRepository.findAll();
    }

    /**
     * Get all movies with type 'movie'
     *
     * @return Iterable<Movie> list
     */
    public Iterable<Movie> getAllMovies() {
        return movieRepository.findAllByType(Type.movie);
    }

    /**
     * Get all movies with type 'wish_list'
     *
     * @return Iterable<Movie> list
     */
    public Iterable<Movie> getAllWishMovies() {
        return movieRepository.findAllByType(Type.wish_list);
    }

    /**
     * Get all movies with at least one genre
     *
     * @param genres set of genre ids
     * @return Iterable<Movie> list
     */
    public Iterable<Movie> getAllByGenres(Set<Integer> genres) {
        return movieRepository.findAllByGenreId(genres);
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

    /**
     * Save wish-movie to db
     *
     * @param wishMovie wish movie object
     */
    public void save(TmdbResult.TmdbMovie wishMovie) {
        Movie newMovie = Movie.fromJson(wishMovie);
        newMovie.setType(Type.wish_list);
        try {
            Movie savedMovie = movieRepository.save(newMovie);
            log.info("saved | {}", savedMovie.toString());
        } catch (DataIntegrityViolationException e) {
            log.error("this movie [{}] already exist", newMovie.toString());
        } catch (Exception e) {
            log.error(wishMovie.toString(), e);
        }
    }

    public void update(TmdbResult.TmdbMovie movieJson, Movie movie) {
        try {
            movie.setConvertedGenres(movieJson.getGenres());
            // need to delete children before saving a-new to prevent error
            movieRepository.delete(movie);
            Movie updatedMovie = movieRepository.save(movie);
            log.info("updated | {}", updatedMovie.toString());
        } catch (Exception e) {
            log.error(movie.toString(), e);
        }
    }

    /**
     * Delete movie from db
     *
     * @param id id for deleted movie
     */
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
            log.error("can't delete movie, wrong id: {}", id, e);
        } catch (Exception e) {
            log.error("failed deleting movie by id: {}", id, e);
        }
    }
}
