package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.configs.UploadConfigs;
import com.blaec.movielibrary.enums.ScanFolders;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.services.MovieService;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.SingleFileUpload;
import com.blaec.movielibrary.to.TmdbResult;
import com.blaec.movielibrary.utils.FilesUtils;
import com.blaec.movielibrary.utils.MovieUtils;
import com.blaec.movielibrary.utils.TmdbApiUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@RequestMapping("/movies")
@CrossOrigin(origins = "*")
@RestController
public class MovieController {
    private final UploadConfigs uploadConfigs;
    private final MovieService movieService;

    @GetMapping
    public Iterable<Movie> getAll() {
        return MovieUtils.sortByTitleAndYear(movieService.getAll());
    }

    @PostMapping("/{folder}")
    public void scanFolder(@PathVariable String folder) {

        // Get all from database
        Iterable<Movie> dbMovies = movieService.getAll();

        // get all movie files from folder
        List<MovieFileTo> movieFiles = FilesUtils.getMoviesFromFolder(getLocation(folder));
        if (movieFiles.size() == 0) {
            log.warn("Folder {} holds no movie files", folder);
        }

        // Save only new movies to database
        for (MovieFileTo movieFile : movieFiles) {
            if (!MovieUtils.isMovieSaved(movieFile.getFileName(), dbMovies)) {
//                log.debug("already exist | {}", movieFile.toString());
//            } else {
                movieService.save(TmdbApiUtils.getMovieByNameAndYear(movieFile), movieFile);
            }
        }
        // TODO return list of fails and stats
    }

    @PostMapping("/file")
    public void uploadMovie(@RequestBody SingleFileUpload uploadMovie) {

        // Get all files from folder, where upload movie is searched, that match upload movie file name
        // Could be more than one (files with the same name from different sub-folders)
        List<MovieFileTo> filteredMovieFiles = FilesUtils.getMoviesFromFolder(getLocation(uploadMovie.getLocation())).stream()
                .filter(movieFile -> movieFile.getFileName().equals(uploadMovie.getFileName()))
                .collect(Collectors.toList());

        // Save if file found and there are no duplicates
        if (filteredMovieFiles.size() != 1) {
            log.warn("Not found at all or more than one movie '{}'", uploadMovie.toString());
        } else {
            MovieFileTo movieFile = filteredMovieFiles.get(0);
            TmdbResult.TmdbMovie movieJson = TmdbApiUtils.getMovieById(uploadMovie.getTmdbId());
            movieService.save(movieJson, movieFile);
        }
        // TODO failure and stats
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        movieService.delete(id);
        // TODO return stats stats
    }

    /**
     * Get movies location
     *
     * @param folder folder name
     * @return location or empty string if folder argument is incorrect
     */
    private String getLocation(String folder) {
        String location = "";
        try {
            location = ScanFolders.valueOf(folder).getLocation(uploadConfigs);
        } catch (IllegalArgumentException e) {
            log.error("No location found by folder {}", folder, e);
        }
        return location;
    }
}
