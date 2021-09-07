package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.configs.UploadConfigs;
import com.blaec.movielibrary.enums.Language;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.services.MovieService;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.Response;
import com.blaec.movielibrary.to.SingleFileUpload;
import com.blaec.movielibrary.to.TmdbResult;
import com.blaec.movielibrary.utils.FilesUtils;
import com.blaec.movielibrary.utils.MovieUtils;
import com.blaec.movielibrary.utils.TmdbApiUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@RequestMapping("/movies")
@CrossOrigin(origins = "*")
@RestController
public class MovieController {
    private final UploadConfigs uploadConfigs;
    private final MovieService movieService;


    @GetMapping("/library")
    public Iterable<Movie> getAll() {
        return movieService.getAll();
    }

    @GetMapping("/gallery")
    public Iterable<Movie> getAllMovies() {
        return MovieUtils.sortByTitleAndYear(movieService.getAllByTypeMovie());
    }

    @GetMapping("/wishlist")
    public Iterable<Movie> getAllWishMovies() {
        return MovieUtils.sortByReleaseYear(movieService.getAllByTypeWishlist());
    }

    @PostMapping("/filter")
    public Iterable<Movie> getAllByGenres(@RequestBody Set<Integer> genreIds) {
        return MovieUtils.sortByTitleAndYear(movieService.getAllByGenres(genreIds));
    }

    @PostMapping("/upload/{folder}")
    public Iterable<Response> uploadFromFolder(@PathVariable String folder) {
        List<MovieFileTo> folderMovies = getMoviesFromFolder(folder);
        Iterable<Movie> dbMovies = movieService.getAll();
        List<MovieFileTo> newMovies = folderMovies.stream()
                .filter(movieFile -> isNewMovie(dbMovies, movieFile))
                .collect(Collectors.toList());

        List<Response> responses = countExistingMovies(folderMovies, newMovies);
        for (MovieFileTo movieFile : newMovies) {
            Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies = TmdbApiUtils.getMultilangMoviesByNameAndYear(movieFile);
            responses.add(movieService.saveToCollection(jsonMovies, movieFile).build());
        }

        return responses;
    }

    private List<MovieFileTo> getMoviesFromFolder(String folder) {
        return FilesUtils.getMoviesFromFolder(MovieUtils.getLocation(folder, uploadConfigs));
    }

    private boolean isNewMovie(Iterable<Movie> dbMovies, MovieFileTo movieFile) {
        return MovieUtils.isMovieSaved(movieFile.getFileName(), dbMovies).isEmpty();
    }

    private List<Response> countExistingMovies(List<MovieFileTo> folderMovies, List<MovieFileTo> newMovies) {
        List<Response> responses = new ArrayList<>();
        for (MovieFileTo movieFile : folderMovies) {
            if (!newMovies.contains(movieFile)) {
                Response existingMovie = Response.Builder.create()
                        .setFailMessage("already exist")
                        .build();
                responses.add(existingMovie);
            }
        }

        return responses;
    }

    @PostMapping("/upload/file")
    public Response uploadMovie(@RequestBody SingleFileUpload uploadMovie) {
        Response.Builder responseBuilder = Response.Builder.create();

        List<MovieFileTo> moviesWithRequestedFileName = getMoviesFromFolder(uploadMovie.getLocation()).stream()
                .filter(isFileNameAsRequested(uploadMovie))
                .collect(Collectors.toList());

        if (moviesWithRequestedFileName.size() != 1) {
            String message = "Not found at all or more than one movie found";
            log.warn("{} '{}'", message, uploadMovie);
            responseBuilder.setFailMessage(message);
        } else {
            MovieFileTo movieFile = moviesWithRequestedFileName.get(0);
            responseBuilder = movieService.saveToCollection(TmdbApiUtils.getMutlilangMoviesById(uploadMovie.getTmdbId()), movieFile);
        }

        return responseBuilder.build();
    }

    private Predicate<MovieFileTo> isFileNameAsRequested(SingleFileUpload uploadMovie) {
        return movieFile -> movieFile.getFileName().equals(uploadMovie.getFileName());
    }

    @PostMapping("/upload/wish")
    public Response saveWishMovie(@RequestBody TmdbResult.TmdbMovie wishMovie) {
        log.info("uploading wish movie | {}", wishMovie);
        return movieService.saveToWishlist(TmdbApiUtils.getMutlilangMoviesById(wishMovie)).build();
    }

    @DeleteMapping("/delete/{tmdbId}")
    public Response delete(@PathVariable String tmdbId) {
        return movieService.delete(tmdbId).build();
    }
}
