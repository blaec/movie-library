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

    @GetMapping("/gallery")
    public Iterable<Movie> getAllMovies() {
        return MovieUtils.sortByTitleAndYear(movieService.getAllMovies());
    }

    @GetMapping("/wishlist")
    public Iterable<Movie> getAllWishMovies() {
        return MovieUtils.sortByTitleAndYear(movieService.getAllWishMovies());
    }

    @PostMapping("/filter")
    public Iterable<Movie> getAllByGenres(@RequestBody Set<Integer> genreIds) {
        return MovieUtils.sortByTitleAndYear(movieService.getAllByGenres(genreIds));
    }

    @PostMapping("/upload/{folder}")
    public Response scanFolder(@PathVariable String folder) {

        // Get all from database
        Iterable<Movie> dbMovies = movieService.getAll();

        // get all movie files from folder
        List<MovieFileTo> movieFiles = FilesUtils.getMoviesFromFolder(MovieUtils.getLocation(folder, uploadConfigs));
        // Save only new movies to database
        int successCount = 0;
        int failCount = 0;
        for (MovieFileTo movieFile : movieFiles) {
            Movie dbMovie = MovieUtils.isMovieSaved(movieFile.getFileName(), dbMovies);
            if (dbMovie != null) {
                // TODO temporarily commented
//                movieService.update(TmdbApiUtils.getMovieById(dbMovie.getTmdbId()), dbMovie);
            } else {
                Response saveResult = movieService.save(TmdbApiUtils.getMovieByNameAndYear(movieFile), movieFile).build();
                if (saveResult.isSuccess()) {
                    successCount++;
                } else {
                    failCount++;
                }
            }
        }

        Response response;
        if (movieFiles.size() == 0) {
            String message = String.format("Folder %s holds no movie files", folder);
            log.warn(message);
            response = Response.create(false, message);
        } else {
            String message = "No movie saved";
            if (successCount > 0 && failCount > 0) {
                message = String.format("Successfully saved %d and failed %d out of %d movies from folder '%s'", successCount, failCount, movieFiles.size(), folder);
            } else if (successCount > 0) {
                message = String.format("Successfully saved %d out of %d movies from folder '%s'", successCount, movieFiles.size(), folder);
            } else if (failCount > 0) {
                message = String.format("All failed %d out of %d movies from folder '%s'", failCount, movieFiles.size(), folder);
            }
            response = Response.create(successCount > 0, message);
        }

        // TODO return list of fails and stats
        return response;
    }

    @PostMapping("/upload/file")
    public Response uploadMovie(@RequestBody SingleFileUpload uploadMovie) {
        String message = "Not found at all or more than one movie found";
        Response.Builder responseBuilder = Response.Builder.create(message);

        // Get all files from folder, where upload movie is searched, that match upload movie file name
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
            TmdbResult.TmdbMovie movieJson = TmdbApiUtils.getMovieById(uploadMovie.getTmdbId());
            responseBuilder = movieService.save(movieJson, movieFile);
        }

        return responseBuilder.build();
    }

    @PostMapping("/upload/wish")
    public Response saveWishMovie(@RequestBody TmdbResult.TmdbMovie wishMovie) {
        Response response = movieService.save(wishMovie);
        log.info("{}", wishMovie.toString());

        return response;
    }

    @DeleteMapping("/delete/{id}")
    public Response delete(@PathVariable Integer id) {
        return movieService.delete(id);
        // TODO return stats stats
    }
}
