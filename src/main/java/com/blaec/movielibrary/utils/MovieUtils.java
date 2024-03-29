package com.blaec.movielibrary.utils;

import com.blaec.movielibrary.configs.UploadConfigs;
import com.blaec.movielibrary.enums.ScanFolders;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.to.MovieTo;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@UtilityClass
public class MovieUtils {

    /**
     * Sort movies by location and file name
     *
     * @param movies    list of movies to sort
     * @param locations list of movie locations
     * @return sorted movies list
     */
    public static Iterable<MovieTo> sortByLocationAndFilename(Iterable<Movie> movies, List<String> locations) {
        return StreamSupport.stream(movies.spliterator(), false)
                .sorted(Comparator.comparing(movie -> movie.extractLocationFreeFilePath(locations)))
                .map(MovieTo::from)
                .collect(Collectors.toList());
    }

    /**
     * Sort movie list by release year
     *
     * @param movies list of movies to sort
     * @return sorted list
     */
    public static Iterable<MovieTo> sortByReleaseYear(Iterable<Movie> movies) {
        return StreamSupport.stream(movies.spliterator(), false)
                .sorted(Comparator.comparing(Movie::getReleaseDate))
                .map(MovieTo::from)
                .collect(Collectors.toList());
    }

    /**
     * Check by fileName and type movie - if movie already saved to database
     *
     * @param fileName movie file name
     * @param dbMovies database movies
     * @return Optional of movie object
     */
    public static Optional<Movie> isMovieSaved(String fileName, Iterable<Movie> dbMovies) {
        return StreamSupport.stream(dbMovies.spliterator(), false)
                .filter(dbMovie -> dbMovie.getType() == Type.movie && dbMovie.getFileName().equals(fileName))
                .findFirst();
    }

    /**
     * Get movies location
     *
     * @param folder folder name
     * @return location or empty string if folder argument is incorrect
     */
    public static String getLocation(String folder, UploadConfigs uploadConfigs) {
        String location = "";
        try {
            location = ScanFolders.valueOf(folder).getLocation(uploadConfigs);
        } catch (IllegalArgumentException e) {
            log.error("No location found by folder {}", folder, e);
        }
        return location;
    }

    /**
     * Convert comma-delimited string into set
     *
     * @param ids comma-delimited string of genre ids
     * @return set of unique genres
     */
    public static Set<Integer> parseGenres(String ids) {
        return Arrays.stream(ids.split(","))
                .map(Integer::valueOf)
                .collect(Collectors.toSet());
    }
}
