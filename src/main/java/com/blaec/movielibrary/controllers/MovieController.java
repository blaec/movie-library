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
        String location = ScanFolders.valueOf(folder).getLocation(uploadConfigs);
        List<MovieFileTo> movieFiles = FilesUtils.getMoviesFromFolder(location);
        for (MovieFileTo movieFile : movieFiles) {
            String url = TmdbApiUtils.getUrlByNameAndYear(movieFile);
            List<TmdbResult.TmdbMovie> results = TmdbApiUtils.getMoviesResult(url).getResults();
            TmdbResult.TmdbMovie movieJson = results.stream().findFirst().orElseGet(null);
            Movie movie = Movie.of(movieJson, movieFile);
            movieService.save(movie, movieFile);
            log.info("{} | {} | {}", results.size(), movie.toString(), url);
        }
    }

    @PostMapping("/file")
    public void uploadMovie(@RequestBody SingleFileUpload uploadMovie) {
        String location = ScanFolders.valueOf(uploadMovie.getLocation()).getLocation(uploadConfigs);
        List<MovieFileTo> filteredMovieFiles = FilesUtils.getMoviesFromFolder(location).stream()
                .filter(m -> m.getFileName().equals(uploadMovie.getFileName()))
                .collect(Collectors.toList());
        if (filteredMovieFiles.size() != 1) {
            log.error("Not found at all or more than one movie '{}' found in folder {}", uploadMovie.getFileName(), uploadMovie.getLocation());
        } else {
            String url = TmdbApiUtils.getUrlById(uploadMovie.getTmdbId());
            TmdbResult.TmdbMovie movieJson = TmdbApiUtils.getMovie(url);
            MovieFileTo movieFile = filteredMovieFiles.get(0);
            Movie movie = Movie.of(movieJson, movieFile);
            movieService.save(movie, movieFile);
            log.info("{} | {}", movie.toString(), url);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        Movie movie = movieService.delete(id);
        log.info("movie {} with id {} deleted", movie.toString(), id);
    }
}
