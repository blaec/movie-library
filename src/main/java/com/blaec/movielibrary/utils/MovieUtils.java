package com.blaec.movielibrary.utils;

import com.blaec.movielibrary.configs.UploadConfigs;
import com.blaec.movielibrary.enums.ScanFolders;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@UtilityClass
public class MovieUtils {

    /**
     * Sort movie list by title and than by release date, skip 'the' and 'a' in title
     *
     * @param movies list of movies to sort
     * @return sorted list
     */
    public static Iterable<Movie> sortByTitleAndYear(Iterable<Movie> movies) {
        return StreamSupport.stream(movies.spliterator(), false)
                .sorted(Comparator
                    .comparing((Movie movie) -> movie.getTitle().replaceAll("The |A ", ""))
                    .thenComparing(Movie::getReleaseDate))
                .collect(Collectors.toList());
    }

    public static Iterable<Movie> sortByLocationTitleAndYear(Iterable<Movie> movies, List<String> locations) {
        return StreamSupport.stream(movies.spliterator(), false)
                .sorted(Comparator
                    .comparing((Movie movie) -> getTitleWithLocation(movie.getFileName(), movie.getLocation(), locations))
                    .thenComparing(Movie::getReleaseDate))
                .collect(Collectors.toList());
    }

    private static String getTitleWithLocation(String fileName, String fullLocation, List<String> locations) {
        for (String location : locations) {
            fullLocation = fullLocation.replaceAll(location, "");
        }
        if (fullLocation.contains("actor -")) {
            fullLocation = "";
        }
        StringBuilder sb = new StringBuilder(fullLocation.replaceAll("\\\\",""));
        if (!fullLocation.isEmpty()) {
            sb.append(".");
        }
        sb.append(fileName.replaceAll("The |A ", ""));
//        log.debug(sb.toString());
        return sb.toString();
    }

    /**
     * Sort movie list by release year
     *
     * @param movies list of movies to sort
     * @return sorted list
     */
    public static Iterable<Movie> sortByReleaseYear(Iterable<Movie> movies) {
        return StreamSupport.stream(movies.spliterator(), false)
                .sorted(Comparator.comparing(Movie::getReleaseDate))
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
}
