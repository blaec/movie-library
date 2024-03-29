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
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.concurrent.Callable;


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
    public Iterable<Movie> getAllWithGenreIds(Set<Integer> genres) {
        return movieRepository.getAllWithGenreIds(genres);
    }

    @Override
    public Iterable<Movie> getAllWithoutGenreIds(Set<Integer> genres) {
        return movieRepository.getAllWithoutGenreIds(genres);
    }

    @Override
    public Iterable<Movie> getAllFilteringByGenres(Set<Integer> includeGenres, Set<Integer> excludeGenres) {
        return movieRepository.getAllFilteringByGenres(includeGenres, excludeGenres);
    }

    @Override
    public boolean isMovieExist(String tmdbId) {
        return movieRepository.getByTmdbId(tmdbId).isPresent();
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
        Movie savedMovie = movieRepository.save(newMovie)
                .orElseThrow(IllegalArgumentException::new);
        log.info("saved | {}", savedMovie);

        return Response.Builder.create()
                .setIsValidTitle(isValidTitle)
                .setMovie(savedMovie)
                .setMessage("Successfully saved");
    }

    @Override
    public Response.Builder updatePoster(Movie movie) {
        Response.Builder responseBuilder = Response.Builder.create();
        try {
            Movie updatedMovie = movieRepository.save(movie)
                    .orElseThrow(IllegalArgumentException::new);
            log.info("updated poster | {}", updatedMovie);
            Callable<Boolean> isUpdated = () ->
                    movie.getPosterPath().equals(updatedMovie.getPosterPath())
                    && movie.getPosterPathRu().equals(updatedMovie.getPosterPathRu());
            responseBuilder
                    .setMovie(updatedMovie)
                    .setMessage("Poster successfully updated")
                    .validateSuccess(isUpdated);
        } catch (Exception e) {
            String message = String.format("Failed to update movie posters | %s", movie);
            log.error(message, e);
            responseBuilder.setMovie(movie).setFailMessage(e.getMessage());
        }
        return responseBuilder;
    }

    @Override
    public Response.Builder updateGenres(Movie movie) {
        Response.Builder responseBuilder = Response.Builder.create();
        try {
            Movie updatedMovie = movieRepository.save(movie)
                    .orElseThrow(IllegalArgumentException::new);
            log.info("updated genres | {}", updatedMovie);
            responseBuilder
                    .setMovie(updatedMovie)
                    .setMessage("Genres successfully updated");
        } catch (Exception e) {
            String message = String.format("Failed to update movie genres | %s", movie);
            log.error(message, e);
            responseBuilder.setMovie(movie).setFailMessage(e.getMessage());
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

    private Response.Builder deleteMovieByTmdbId(String tmdbId) throws IllegalArgumentException {
        Response.Builder responseBuilder = Response.Builder.create();

        Movie movie = movieRepository.getByTmdbId(tmdbId)
                .orElseThrow(IllegalArgumentException::new);
        movieRepository.delete(movie);

        String message = String.format("deleted | %s with id %d", movie, movie.getId());
        log.info(message);
        responseBuilder.setMovie(movie).setMessage(message);

        return responseBuilder;
    }
}
