package com.blaec.movielibrary.services.implementations;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.object.Response;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
import com.blaec.movielibrary.repository.MovieRepository;
import com.blaec.movielibrary.services.MovieService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;


@Slf4j
@AllArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;


    @Override
    public Iterable<Movie> getAll() {
        return movieRepository.getAll();
    }

    @Override
    public Iterable<Movie> getAllByTypeMovie() {
        return movieRepository.getAllByType(Type.movie);
    }

    @Override
    public Iterable<Movie> getAllByTypeWishlist() {
        return movieRepository.getAllByType(Type.wish_list);
    }

    @Override
    public Iterable<Movie> getAllByGenres(Set<Integer> genres) {
        return movieRepository.getAllByGenreId(genres);
    }

    @Override
    public Response.Builder saveToWishlist(Optional<MovieTmdbTo> tmdbMovie) {
        return tmdbMovie
                .map(movieTmdbTo -> save(Movie.createWithWishlistType(movieTmdbTo)))
                .orElseGet(() -> Response.Builder.create().setMessage("passed null json object"));
    }

    @Override
    public Response.Builder saveToCollection(Optional<MovieTmdbTo> tmdbMovie, MovieFileTo movieFile) {
        return tmdbMovie
                .map(movieTmdbTo -> validateAndSaveToCollection(movieTmdbTo, movieFile))
                .orElseGet(() -> Response.Builder.create().setFailMessage("passed null json object"));
    }

    private Response.Builder validateAndSaveToCollection(MovieTmdbTo tmdbMovie, MovieFileTo movieFile) {
        Movie newMovie = Movie.createWithMovieType(tmdbMovie, movieFile);
        boolean isValidTitle = isValidMovieByTitle(movieFile, newMovie);

        return save(newMovie, isValidTitle);
    }

    // FIXME not correct check, should show warning, not in logs only
    private boolean isValidMovieByTitle(MovieFileTo movieFile, Movie newMovie) {
        boolean hasInconsistentTitle = !movieFile.getName().equalsIgnoreCase(newMovie.getTitle());
        if (hasInconsistentTitle) {
            log.warn("check if it's correct | {} -x-> {}}", newMovie, movieFile.getFileName());
        }

        return !hasInconsistentTitle;
    }

    private Response.Builder save(Movie newMovie) {
        return save(newMovie, true);
    }

    private Response.Builder save(Movie newMovie, boolean isValidTitle) {
        Response.Builder responseBuilder = Response.Builder.create().setIsValidTitle(isValidTitle);
        try {
            Movie savedMovie = movieRepository.save(newMovie);
            log.info("saved | {}", savedMovie);
            responseBuilder.setMovie(savedMovie).setMessage("Successfully saved");
        } catch (DataIntegrityViolationException e) {
            log.error("this movie [{}] already exists", newMovie);
            responseBuilder.setMovie(newMovie).setFailMessage("Already exist");     // TODO change to Duplicate entry, fix tests and react
        } catch (Exception e) {
            log.error(newMovie.toString(), e);
            responseBuilder.setMovie(newMovie).setFailMessage(e.getMessage());
        }

        return responseBuilder;
    }

    @Override
    public Response.Builder delete(String tmdbId) {
        Response.Builder responseBuilder;
        try {
            responseBuilder = deleteMovieByTmdbId(tmdbId);
        } catch (IllegalArgumentException e) {
            String message = String.format("Can't delete movie, wrong tmdbId: %s", tmdbId);
            log.error(message, e);
            responseBuilder = Response.Builder.create().setTmdbId(tmdbId).setFailMessage(message);
        } catch (Exception e) {
            String message = String.format("Failed deleting movie by tmdbId: %s", tmdbId);
            log.error(message, e);
            responseBuilder = Response.Builder.create().setTmdbId(tmdbId).setFailMessage(message);
        }

        return responseBuilder;
    }

    private Response.Builder deleteMovieByTmdbId(String tmdbId) {
        Response.Builder responseBuilder = Response.Builder.create();

        Movie movie = movieRepository.getByTmdbId(tmdbId);
        if (movie == null) {
            String message = String.format("No movie with tmdbId %s exists", tmdbId);
            log.warn(message);
            responseBuilder.setTmdbId(tmdbId).setFailMessage(message);
        } else {
            int id = movie.getId();
            movieRepository.deleteById(id);
            String message = String.format("deleted | %s with id %d", movie, id);
            log.info(message);
            responseBuilder.setMovie(movie).setMessage(message);
        }

        return responseBuilder;
    }
}
