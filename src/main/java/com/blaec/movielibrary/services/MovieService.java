package com.blaec.movielibrary.services;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.Response;
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
    public Response save(TmdbResult.TmdbMovie movieJson, MovieFileTo movieFile) {
        Response response = Response.create(false, "null passed");

        if (MovieUtils.isNullSave(movieJson, movieFile.toString())) {
            Movie newMovie = Movie.of(movieJson, movieFile);
            try {
                // FIXME not correct check
                if (!movieFile.getName().equalsIgnoreCase(newMovie.getTitle())) {
                    log.warn("check if it's correct | {} -x-> {}}", newMovie, movieFile.getFileName());
                }
                Movie savedMovie = movieRepository.save(newMovie);
                log.info("saved | {}", savedMovie);
                response = Response.create(true, "Successfully saved");
            } catch (DataIntegrityViolationException e) {
                log.error("this movie [{}] already exist", newMovie);
                response = Response.create(false, "Already exist");
            } catch (Exception e) {
                log.error(movieFile.toString(), e);
                response = Response.create(false, e.getMessage());
            }
        }

        return response;
    }

    /**
     * Save wish-movie to db
     *
     * @param wishMovie wish movie object
     */
    public Response save(TmdbResult.TmdbMovie wishMovie) {
        Response.Builder responseBuilder = Response.Builder.create();
        Movie newMovie = Movie.fromJson(wishMovie);
        newMovie.setType(Type.wish_list);
        try {
            Movie savedMovie = movieRepository.save(newMovie);
            log.info("saved | {}", savedMovie);
            responseBuilder.setMovie(savedMovie).setMessage("Successfully saved");
        } catch (DataIntegrityViolationException e) {
            log.error("this movie [{}] already exist", newMovie);
            responseBuilder.setMovie(newMovie).setFail().setMessage("Already exist");
        } catch (Exception e) {
            log.error(wishMovie.toString(), e);
            responseBuilder.setMovie(newMovie).setFail().setMessage(e.getMessage());
        }

        return responseBuilder.build();
    }

    /**
     * Delete movie from db
     *
     * @param id id for deleted movie
     */
    public Response delete(Integer id) {
        Response response;

        try {
            Movie movie = movieRepository.findById(id).orElse(null);
            if (movie == null) {
                String message = String.format("No movie with id %d exists", id);
                log.warn(message);
                response = Response.create(false, message);
            } else {
                movieRepository.deleteById(id);
                String message = String.format("Movie %s with id %d deleted", movie, id);
                log.info(message);
                response = Response.create(true, message);
            }
        } catch (IllegalArgumentException e) {
            String message = String.format("Can't delete movie, wrong id: %d", id);
            log.error(message, e);
            response = Response.create(false, message);
        } catch (Exception e) {
            String message = String.format("Failed deleting movie by id: %d", id);
            log.error("Failed deleting movie by id: {}", id, e);
            response = Response.create(false, message);
        }

        return response;
    }

    // TODO currently not in use
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
}
