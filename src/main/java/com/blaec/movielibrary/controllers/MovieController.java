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

import java.util.ArrayList;
import java.util.List;
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
        List<Response> responses = new ArrayList<>();

        // Get all from database
        Iterable<Movie> dbMovies = movieService.getAll();

        // get all movie files from folder
        List<MovieFileTo> movieFiles = FilesUtils.getMoviesFromFolder(MovieUtils.getLocation(folder, uploadConfigs));

        // Save only new movies to database
        for (MovieFileTo movieFile : movieFiles) {
            Movie dbMovie = MovieUtils.isMovieSaved(movieFile.getFileName(), dbMovies);
            if (dbMovie != null) {
                // TODO temporarily commented
//                movieService.update(TmdbApiUtils.getMovieById(dbMovie.getTmdbId()), dbMovie);
                responses.add(Response.Builder.create().setMovie(dbMovie).setFail().setMessage("already exist").build());
            } else {
                TmdbResult.TmdbMovie movieEN = TmdbApiUtils.getMovieByNameAndYear(movieFile, Language.EN);
                TmdbResult.TmdbMovie movieRU = TmdbApiUtils.getMovieByNameAndYear(movieFile, Language.RU);
                responses.add(movieService.save(movieEN, movieRU, movieFile).build());
            }
        }

        return responses;
    }

    @PostMapping("/upload/file")
    public Response uploadMovie(@RequestBody SingleFileUpload uploadMovie) {
        String message = "Not found at all or more than one movie found";
        Response.Builder responseBuilder = Response.Builder.create(message);

        // Get all files from folder, where settings movie is searched, that match settings movie file name
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
            TmdbResult.TmdbMovie movieJson = TmdbApiUtils.getMovieById(uploadMovie.getTmdbId(), Language.EN);
            TmdbResult.TmdbMovie movieJsonRu = TmdbApiUtils.getMovieById(uploadMovie.getTmdbId(), Language.RU);
            responseBuilder = movieService.save(movieJson, movieJsonRu, movieFile);
        }

        return responseBuilder.build();
    }

    @PostMapping("/upload/wish")
    public Response saveWishMovie(@RequestBody TmdbResult.TmdbMovie wishMovie) {
        TmdbResult.TmdbMovie movieJson = TmdbApiUtils.getMovieById(wishMovie.getId(), Language.EN);
        TmdbResult.TmdbMovie movieJsonRu = TmdbApiUtils.getMovieById(wishMovie.getId(), Language.RU);
        Response response = movieService.save(movieJson, movieJsonRu);
        log.info("{}", wishMovie);

        return response;
    }

    @DeleteMapping("/delete/{tmdbId}")
    public Response delete(@PathVariable String tmdbId) {
        return movieService.delete(tmdbId);
    }
}
