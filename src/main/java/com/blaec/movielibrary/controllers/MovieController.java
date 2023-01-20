package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.json.SingleFileUpload;
import com.blaec.movielibrary.model.json.TmdbResult;
import com.blaec.movielibrary.model.object.Response;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
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
    public Iterable<Movie> getAll() {
        return StreamSupport.stream(movieService.getAll().spliterator(), false)
                .map(Movie::removeGenres)
                .collect(Collectors.toList());
    }

    @GetMapping("/gallery")
    public Iterable<Movie> getAllMovies() {
        return MovieUtils.sortByLocationAndFilename(movieService.getAllByTypeMovie(), locations);
    }

    @GetMapping("/wishlist")
    public Iterable<Movie> getAllWishMovies() {
        return MovieUtils.sortByReleaseYear(movieService.getAllByTypeWishlist());
    }

    @GetMapping("/filter")
    public Iterable<Movie> getAllByGenres(@RequestParam("genre-ids") String ids) {
        Set<Integer> genreIds = Arrays.stream(ids.split(","))
                .map(Integer::valueOf)
                .collect(Collectors.toSet());
        return MovieUtils.sortByLocationAndFilename(movieService.getAllByGenres(genreIds), locations);
    }

    @GetMapping("/filter-genres-out")
    public Iterable<Movie> getAllExceptGenres(@RequestParam("genre-ids") String ids) {
        Set<Integer> genreIds = Arrays.stream(ids.split(","))
                .map(Integer::valueOf)
                .collect(Collectors.toSet());
        return MovieUtils.sortByLocationAndFilename(movieService.getAllExceptGenres(genreIds), locations);
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

    @DeleteMapping("/delete/{tmdbId}")
    public Response delete(@PathVariable String tmdbId) {
        return movieService.delete(tmdbId).build();
    }
}
