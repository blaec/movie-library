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
    public Response.Builder save(TmdbResult.TmdbMovie movieJson, MovieFileTo movieFile) {
        Response.Builder responseBuilder = Response.Builder.create("passed null json object");

        if (MovieUtils.isNullSafe(movieJson, movieFile.toString())) {
            Movie newMovie = Movie.of(movieJson, movieFile);
            // FIXME not correct check
            if (!movieFile.getName().equalsIgnoreCase(newMovie.getTitle())) {
                log.warn("check if it's correct | {} -x-> {}}", newMovie, movieFile.getFileName());
            }
            trySave(responseBuilder, newMovie);
        }

        return responseBuilder;
    }

    /**
     * Save wish-movie to db
     *
     * @param wishMovie wish movie object
     */
    public Response save(TmdbResult.TmdbMovie wishMovie) {
        Response.Builder responseBuilder = Response.Builder.create();
        Movie newMovie = Movie.fromJson(wishMovie).assignType(Type.wish_list);

        return trySave(responseBuilder, newMovie).build();
    }

    private Response.Builder trySave(Response.Builder responseBuilder, Movie newMovie) {
        try {
            Movie savedMovie = movieRepository.save(newMovie);
            log.info("saved | {}", savedMovie);
            responseBuilder.setMovie(savedMovie).setMessage("Successfully saved");
        } catch (DataIntegrityViolationException e) {
            log.error("this movie [{}] already exist", newMovie);
            responseBuilder.setMovie(newMovie).setFail().setMessage("Already exist");
        } catch (Exception e) {
            log.error(newMovie.toString(), e);
            responseBuilder.setMovie(newMovie).setFail().setMessage(e.getMessage());
        }

        return responseBuilder;
    }

    /**
     * Delete movie from db
     *
     * @param tmdbId tmdbId for deleted movie
     */
    public Response delete(String tmdbId) {
        Response.Builder responseBuilder = Response.Builder.create();

        try {
            Movie movie = movieRepository.findByTmdbId(tmdbId);
            if (movie == null) {
                String message = String.format("No movie with tmdbId %s exists", tmdbId);
                log.warn(message);
                responseBuilder.setTmdbId(tmdbId).setFail().setMessage(message);
            } else {
                int id = movie.getId();
                movieRepository.deleteById(id);
                String message = String.format("Movie %s with id %d deleted", movie, id);
                log.info(message);
                responseBuilder.setMovie(movie).setMessage(message);
            }
        } catch (IllegalArgumentException e) {
            String message = String.format("Can't delete movie, wrong tmdbId: %s", tmdbId);
            log.error(message, e);
            responseBuilder.setTmdbId(tmdbId).setFail().setMessage(message);
        } catch (Exception e) {
            String message = String.format("Failed deleting movie by tmdbId: %s", tmdbId);
            log.error("Failed deleting movie by tmdbId: {}", tmdbId, e);
            responseBuilder.setTmdbId(tmdbId).setFail().setMessage(message);
        }

        return responseBuilder.build();
    }

    // TODO currently not in use
    public void update(TmdbResult.TmdbMovie movieJson, Movie movie) {
        try {
            movie.setConvertedGenres(movieJson.getGenres());
            // need to delete children before saving a-new to prevent error
            movieRepository.delete(movie);
            Movie updatedMovie = movieRepository.save(movie);
            log.info("updated | {}", updatedMovie);
        } catch (Exception e) {
            log.error(movie.toString(), e);
        }
    }
}
