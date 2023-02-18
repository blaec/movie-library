package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.json.SingleFileUpload;
import com.blaec.movielibrary.model.json.TmdbResult;
import com.blaec.movielibrary.model.object.Response;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
import com.blaec.movielibrary.model.to.MovieTo;
import com.blaec.movielibrary.utils.MovieUtils;
import com.blaec.movielibrary.utils.TestUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@RequestMapping(MovieController.URL)
@RestController
public class MovieController extends AbstractMovieController{
    static final String URL = API_VERSION + "/movies";

    @GetMapping("/library")
    public Iterable<MovieTo> getAll() {
        return StreamSupport.stream(movieService.getAll().spliterator(), false)
                .map(MovieTo::from)
                .collect(Collectors.toList());
    }

    @GetMapping("/gallery")
    public Iterable<MovieTo> getAllMovies() {
        return MovieUtils.sortByLocationAndFilename(movieService.getAllByTypeMovie(), locations);
    }

    @GetMapping("/wishlist")
    public Iterable<MovieTo> getAllWishMovies() {
        return MovieUtils.sortByReleaseYear(movieService.getAllByTypeWishlist());
    }

    @GetMapping("/filter-include-genres")
    public Iterable<MovieTo> getAllWithGenreIds(@RequestParam("genre-ids") String ids) {
        Set<Integer> genres = MovieUtils.parseGenres(ids);
        Iterable<Movie> filteredMovies = movieService.getAllWithGenreIds(genres);

        return MovieUtils.sortByLocationAndFilename(filteredMovies, locations);
    }

    @GetMapping("/filter-exclude-genres")
    public Iterable<MovieTo> getAllWithoutGenreIds(@RequestParam("genre-ids") String ids) {
        Set<Integer> genres = MovieUtils.parseGenres(ids);
        Iterable<Movie> filteredMovies = movieService.getAllWithoutGenreIds(genres);

        return MovieUtils.sortByLocationAndFilename(filteredMovies, locations);
    }

    @GetMapping("/dual-filter-by-genres")
    public Iterable<MovieTo> getAllFilteringByGenres(
            @RequestParam("include-genre-ids") String withGenres,
            @RequestParam("exclude-genre-ids") String withoutGenres) {
        Set<Integer> includeGenres = MovieUtils.parseGenres(withGenres);
        Set<Integer> excludeGenres = MovieUtils.parseGenres(withoutGenres);
        Iterable<Movie> filteredMovies = movieService.getAllFilteringByGenres(includeGenres, excludeGenres);

        return MovieUtils.sortByLocationAndFilename(filteredMovies, locations);
    }

    @PostMapping("/upload/{folder}")
    public Iterable<Response> uploadFromFolder(@PathVariable String folder) {
        List<MovieFileTo> folderMovies = getMoviesFromFolder(folder);
        Iterable<Movie> dbMovies = movieService.getAll();
        List<MovieFileTo> newMovies = folderMovies.stream()
                .filter(movieFile -> isNewMovie(dbMovies, movieFile))
                .collect(Collectors.toList());

        List<Response> responses = countExistingMovies(folderMovies, newMovies);
        newMovies.parallelStream()
                .forEach(movieFile -> {
                    Optional<MovieTmdbTo> tmdbMovie = tmdbApi.getMovieByNameAndYear(movieFile);
                    responses.add(trySaveToCollection(tmdbMovie, movieFile).build());
                });

        logMissingFiles();
        return responses;
    }

    private void logMissingFiles() {
        if (TestUtils.isJUnitTest()) return;

        StreamSupport.stream(getAllMovies().spliterator(), true)
                .map(movie -> String.format("%s\\%s", movie.getLocation(), movie.getFileName()))
                .filter(path -> !(new File(path)).exists())
                .forEach(path -> log.warn("Saved to db, but not found on disk: {}", path));
    }

    @PostMapping("/upload/file")
    public Response uploadMovie(@RequestBody SingleFileUpload uploadMovie) {
        if (movieService.isMovieExist(uploadMovie.getTmdbId())) {
            return Response.Builder
                    .create()
                    .setExist("This movie already exists")
                    .setTitle(uploadMovie.getFileName())
                    .build();
        }

        List<MovieFileTo> moviesWithRequestedFileName = getMoviesFromFolder(uploadMovie.getLocation()).stream()
                .filter(isFileNameMatchRequested(uploadMovie))
                .toList();

        Supplier<Response> onSuccess = () -> {
            Optional<MovieTmdbTo> tmdbMovie = tmdbApi.getMovieById(uploadMovie.getTmdbId());
            return moviesWithRequestedFileName.stream()
                    .map(m -> trySaveToCollection(tmdbMovie, m))
                    .findFirst()
                    .orElse(Response.Builder.create())
                    .build();
        };
        Supplier<Response> onFail = () -> {
            String message = "Not found at all or more than one movie found";
            log.warn("{} '{}'", message, uploadMovie);
            return Response.Builder.create()
                    .setFailMessage(message)
                    .build();
        };
        Supplier<Response> response = moviesWithRequestedFileName.size() == 1
                ? onSuccess
                : onFail;

        return response.get();
    }

    @PostMapping("/upload/wish")
    public Response saveWishMovie(@RequestBody TmdbResult.TmdbMovie wishMovie) {
        log.info("uploading wish movie | {}", wishMovie);
        Optional<MovieTmdbTo> tmdbMovie = tmdbApi.getMovieById(wishMovie);
        return trySaveToWishlist(tmdbMovie).build();
    }

    @PutMapping("/update-movie-posters")
    public Response updatePoster(@RequestBody Movie movie) {
        log.debug(String.format("Updating posters to movie %s with EN-poster %s and RU-poster %s", movie, movie.getPosterPath(), movie.getPosterPathRu()));
        return movieService.updatePoster(movie).build();
    }

    @PutMapping("/update-movie-genres")
    public Response updateGenres(@RequestBody Movie movie) {
        log.debug(String.format("Updating genres to movie %s", movie));
        return movieService.updateGenres(movie).build();
    }

    @DeleteMapping("/delete/{tmdbId}")
    public Response delete(@PathVariable String tmdbId) {
        return movieService.delete(tmdbId).build();
    }
}
