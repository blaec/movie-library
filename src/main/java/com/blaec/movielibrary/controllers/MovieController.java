package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.configs.UploadConfigs;
import com.blaec.movielibrary.enums.ScanFolders;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.SingleFileUpload;
import com.blaec.movielibrary.to.TmdbResult;
import com.blaec.movielibrary.utils.FilesUtils;
import com.blaec.movielibrary.utils.TmdbApiUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@AllArgsConstructor
@RequestMapping("/movies")
@CrossOrigin(origins = "*")
@RestController
public class MovieController {
    private final UploadConfigs uploadConfigs;
    private final MovieRepository movieRepository;

    @GetMapping
    public Iterable<Movie> getAll() {
        return sortByTitleAndYear(movieRepository.findAll());
    }

    @PostMapping("/{folder}")
    public void scanFolder(@PathVariable String folder) {
        String location = ScanFolders.valueOf(folder).getLocation(uploadConfigs);
        List<MovieFileTo> movieFiles = FilesUtils.getMoviesFromFolder(location);
        for (MovieFileTo movieFile : movieFiles) {
            String url = TmdbApiUtils.getUrlByNameAndYear(movieFile);
            try {
                List<TmdbResult.TmdbMovie> results = TmdbApiUtils.getMoviesResult(url).getResults();
                TmdbResult.TmdbMovie movieJson = results.stream().findFirst().orElseGet(null);
                Movie movie = Movie.of(movieJson, movieFile);
                movieRepository.save(movie);
                log.info("{} | {} | {}", results.size(), movie.toString(), url);
            } catch (DataIntegrityViolationException e) {
                log.error("already exist: {}", url);
            } catch (Exception e) {
                log.error(url, e);
            }
        }
    }

    @PostMapping("/single")
    public void uploadMovie(@RequestBody SingleFileUpload uploadMovie) {
        String location = ScanFolders.valueOf(uploadMovie.getLocation()).getLocation(uploadConfigs);
        List<MovieFileTo> filteredMovieFiles = FilesUtils.getMoviesFromFolder(location).stream()
                .filter(m -> m.getFileName().equals(uploadMovie.getFileName()))
                .collect(Collectors.toList());
        if (filteredMovieFiles.size() != 1) {
            log.error("Not found at all or more than one movie '{}' found in folder {}", uploadMovie.getFileName(), uploadMovie.getLocation());
        } else {
            String url = TmdbApiUtils.getUrlById(uploadMovie.getTmdbId());
            try {
                TmdbResult.TmdbMovie movieJson = TmdbApiUtils.getMovie(url);
                MovieFileTo movieFile = filteredMovieFiles.get(0);
                Movie movie = Movie.of(movieJson, movieFile);
                movieRepository.save(movie);
                log.info("{} | {}", movie.toString(), url);
            } catch (DataIntegrityViolationException e) {
                log.error("already exist: {}", url);
            } catch (Exception e) {
                log.error(url, e);
            }
        }
    }

    /**
     * Sort movie list by title and than by release date, skip 'the' and 'a' in title
     *
     * @param movies list of movies to sort
     * @return sorted list
     */
    private Iterable<Movie> sortByTitleAndYear(Iterable<Movie> movies) {
        return StreamSupport.stream(movies.spliterator(), false).sorted(Comparator
                .comparing((Movie m) ->
                        m.getTitle().startsWith("The ")
                            ? m.getTitle().replace("The ", "")
                            : m.getTitle().startsWith("A ")
                                ? m.getTitle().replace("A ", "")
                                : m.getTitle())
                .thenComparing(Movie::getReleaseDate))
                .collect(Collectors.toList());
    }
}
