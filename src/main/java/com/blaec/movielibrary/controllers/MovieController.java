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
        List<MovieFileTo> folderMovies = FilesUtils.getMoviesFromFolder(MovieUtils.getLocation(folder, uploadConfigs));
        Iterable<Movie> dbMovies = movieService.getAll();
        List<MovieFileTo> newMovies = folderMovies.stream()
                .filter(movieFile -> isNewMovie(dbMovies, movieFile))
                .collect(Collectors.toList());

        List<Response> responses = countExistingMovies(folderMovies, newMovies);
        for (MovieFileTo movieFile : newMovies) {
            Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies = TmdbApiUtils.getMoviesByNameAndYear(movieFile);
            responses.add(movieService.saveToCollection(jsonMovies, movieFile).build());
        }

        return responses;
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
        String message = "Not found at all or more than one movie found";
        Response.Builder responseBuilder = Response.Builder.create(message);

        // Get all files from folder with the same file name as uploaded movie
        // Could be more than one (files with the same name from different sub-folders)
        List<MovieFileTo> filteredMovieFiles = FilesUtils.getMoviesFromFolder(MovieUtils.getLocation(uploadMovie.getLocation(), uploadConfigs)).stream()
                .filter(movieFile -> movieFile.getFileName().equals(uploadMovie.getFileName()))
                .collect(Collectors.toList());

        // Save if file found and there are no duplicates
        if (filteredMovieFiles.size() != 1) {
            log.warn("{} '{}'", message, uploadMovie);
            responseBuilder.setFailMessage(message);
        } else {
            MovieFileTo movieFile = filteredMovieFiles.get(0);
            responseBuilder = movieService.saveToCollection(TmdbApiUtils.getMoviesById(uploadMovie.getTmdbId()), movieFile);
        }

        return responseBuilder.build();
    }

    @PostMapping("/upload/wish")
    public Response saveWishMovie(@RequestBody TmdbResult.TmdbMovie wishMovie) {
        log.info("uploading wish movie | {}", wishMovie);
        return movieService.saveToWishlist(TmdbApiUtils.getMoviesById(wishMovie)).build();
    }

    @DeleteMapping("/delete/{tmdbId}")
    public Response delete(@PathVariable String tmdbId) {
        return movieService.delete(tmdbId).build();
    }
}
