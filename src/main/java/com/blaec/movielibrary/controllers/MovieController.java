package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.configs.UploadConfigs;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
        // TODO used to refresh all poster images
//        for (Movie movie : movieService.getAll()) {
//            TmdbResult.TmdbMovie movieEN = TmdbApiUtils.getMovieById(movie.getTmdbId(), Language.EN);
//            TmdbResult.TmdbMovie movieRU = TmdbApiUtils.getMovieById(movie.getTmdbId(), Language.RU);
//            log.debug("KPNUNQ UPDATE `movie_library`.`movies` SET `poster_path` = '{}' WHERE (`tmdb_id` = '{}');", movieEN.getPoster_path(), movieEN.getId());
//            log.debug("KPNUNQ UPDATE `movie_library`.`movies` SET `poster_path_ru` = '{}' WHERE (`tmdb_id` = '{}');", movieRU.getPoster_path(), movieRU.getId());
//        }
        return movieService.getAll();
    }

    @GetMapping("/gallery")
    public Iterable<Movie> getAllMovies() {
        return MovieUtils.sortByTitleAndYear(movieService.getAllMovies());
    }

    @GetMapping("/wishlist")
    public Iterable<Movie> getAllWishMovies() {
        return MovieUtils.sortByReleaseYear(movieService.getAllWishMovies());
    }

    @PostMapping("/filter")
    public Iterable<Movie> getAllByGenres(@RequestBody Set<Integer> genreIds) {
        return MovieUtils.sortByTitleAndYear(movieService.getAllByGenres(genreIds));
    }

    @PostMapping("/upload/{folder}")
    public Iterable<Response> scanFolder(@PathVariable String folder) {
        List<MovieFileTo> folderMovies = FilesUtils.getMoviesFromFolder(MovieUtils.getLocation(folder, uploadConfigs));
        Iterable<Movie> dbMovies = movieService.getAll();

        // Save only new movies to database
        List<Response> responses = new ArrayList<>();
        for (MovieFileTo movieFile : folderMovies) {
            Optional<Movie> dbMovie = MovieUtils.isMovieSaved(movieFile.getFileName(), dbMovies);
            if (dbMovie.isPresent()) {
                // TODO temporarily commented
//                movieService.update(TmdbApiUtils.getMovieById(dbMovie.getTmdbId()), dbMovie);
                responses.add(Response.Builder.create().setMovie(dbMovie.get()).setFail().setMessage("already exist").build());
            } else {
                responses.add(movieService.save(TmdbApiUtils.getMoviesByNameAndYear(movieFile), movieFile).build());
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
            responseBuilder.setFail();
        } else {
            MovieFileTo movieFile = filteredMovieFiles.get(0);
            responseBuilder = movieService.save(TmdbApiUtils.getMoviesById(uploadMovie.getTmdbId()), movieFile);
        }

        return responseBuilder.build();
    }

    @PostMapping("/upload/wish")
    public Response saveWishMovie(@RequestBody TmdbResult.TmdbMovie wishMovie) {
        log.info("uploading wish movie | {}", wishMovie);
        return movieService.save(TmdbApiUtils.getMoviesById(wishMovie));
    }

    @DeleteMapping("/delete/{tmdbId}")
    public Response delete(@PathVariable String tmdbId) {
        return movieService.delete(tmdbId);
    }
}
