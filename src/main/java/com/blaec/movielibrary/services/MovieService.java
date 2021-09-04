package com.blaec.movielibrary.services;

import com.blaec.movielibrary.enums.Language;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.Response;
import com.blaec.movielibrary.to.TmdbResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.Set;


@Slf4j
@AllArgsConstructor
@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public Iterable<Movie> getAll() {
        return movieRepository.findAll();
    }

    public Iterable<Movie> getAllByTypeMovie() {
        return movieRepository.findAllByType(Type.movie);
    }

    public Iterable<Movie> getAllByTypeWishlist() {
        return movieRepository.findAllByType(Type.wish_list);
    }

    public Iterable<Movie> getAllByGenres(Set<Integer> genres) {
        return movieRepository.findAllByGenreId(genres);
    }

    public Response.Builder saveToWishlist(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies) {
        return isAllJsonMoviesPresent(jsonMovies)
                ? save(Movie.withWishlistTypeOf(jsonMovies))
                : Response.Builder.create("passed null json object");
    }

    public Response.Builder saveToCollection(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies, MovieFileTo movieFile) {
        return isAllJsonMoviesPresent(jsonMovies)
                ? validateAndSave(jsonMovies, movieFile)
                : Response.Builder.create("passed null json object");
    }

    private boolean isAllJsonMoviesPresent(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies) {
        return jsonMovies.values().stream().allMatch(Optional::isPresent);
    }

    private Response.Builder validateAndSave(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies, MovieFileTo movieFile) {
        Movie newMovie = Movie.withMovieTypeOf(jsonMovies, movieFile);
        validateMovieByTitle(movieFile, newMovie);

        return save(newMovie);
    }

    // FIXME not correct check
    private void validateMovieByTitle(MovieFileTo movieFile, Movie newMovie) {
        boolean hasInconsistentTitle = !movieFile.getName().equalsIgnoreCase(newMovie.getTitle());
        if (hasInconsistentTitle) {
            log.warn("check if it's correct | {} -x-> {}}", newMovie, movieFile.getFileName());
        }
    }

    private Response.Builder save(Movie newMovie) {
        Response.Builder responseBuilder = Response.Builder.create();
        try {
            Movie savedMovie = movieRepository.save(newMovie);
            log.info("saved | {}", savedMovie);
            responseBuilder.setMovie(savedMovie).setMessage("Successfully saved");
        } catch (DataIntegrityViolationException e) {
            log.error("this movie [{}] already exist", newMovie);
            responseBuilder.setMovie(newMovie).setFailMessage("Already exist");
        } catch (Exception e) {
            log.error(newMovie.toString(), e);
            responseBuilder.setMovie(newMovie).setFailMessage(e.getMessage());
        }

        return responseBuilder;
    }

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

        Movie movie = movieRepository.findByTmdbId(tmdbId);
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


/*
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
*/
}
