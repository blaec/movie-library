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
import java.util.stream.Stream;
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
        List<MovieFileTo> moviesFromFolder = getAllFrom(folder);

        for (MovieFileTo movieFileTo : moviesFromFolder) {
            String url = TmdbApiUtils.getSearchUrlByNameAndYear(movieFileTo);
            try {
                List<TmdbResult.TmdbMovie> results = TmdbApiUtils.getFirstMovie(url).getResults();
                TmdbResult.TmdbMovie movieJson = results.stream()
                        .findFirst().orElseGet(null);
                Movie movie = Movie.of(movieJson, movieFileTo);
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
    public void uploadSingle(@RequestBody SingleFileUpload movie) {
        List<MovieFileTo> moviesFromFolder = getAllFrom(movie.getLocation());
        if (getMatch(moviesFromFolder, movie.getFileName()).count() != 1) {
            log.error("Not found movie '{}' in folder {}", movie.getFileName(), movie.getLocation());
        } else {
            String url = TmdbApiUtils.getMovieUrlById(movie.getTmdbId());
            try {
                TmdbResult.TmdbMovie movieJson = TmdbApiUtils.getMovie(url);
                Movie movieObject = Movie.of(movieJson, getMatch(moviesFromFolder, movie.getFileName()).findFirst().orElse(null));
                movieRepository.save(movieObject);
                log.info("{} | {}", movieObject.toString(), url);
            } catch (DataIntegrityViolationException e) {
                log.error("already exist: {}", url);
            } catch (Exception e) {
                log.error(url, e);
            }
            log.debug(url);
        }
    }

    private Stream<MovieFileTo> getMatch(List<MovieFileTo> moviesFromFolder, String fileName) {
        return moviesFromFolder.stream()
                .filter(m -> m.getFileName().equals(fileName));
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

    private List<MovieFileTo> getAllFrom(String folder) {
        String location;
        switch (ScanFolders.valueOf(folder)) {
            case cartoons:      location = uploadConfigs.getLocation().getCartoons();       break;
            case movies:        location = uploadConfigs.getLocation().getMovies();         break;
            case serialMovies:  location = uploadConfigs.getLocation().getSerialMovies();   break;
            case music:         location = uploadConfigs.getLocation().getMusic();          break;
            case videos:        location = uploadConfigs.getLocation().getVideos();         break;
            default:            location = "";
        }
        return FilesUtils.getMoviesFromFolder(location);
    }
}
