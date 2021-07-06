package com.blaec.movielibrary.utils;

import com.blaec.movielibrary.configs.UploadConfigs;
import com.blaec.movielibrary.enums.ScanFolders;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.to.TmdbResult;
import lombok.extern.slf4j.Slf4j;

import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
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
     * Check by fileName if movie already saved to database
     *
     * @param fileName movie file name
     * @param dbMovies database movies
     * @return Movie object if movie exists in database, otherwise - null
     */
    public static Movie isMovieSaved(String fileName, Iterable<Movie> dbMovies) {
        return StreamSupport.stream(dbMovies.spliterator(), false)
                .filter(dbMovie -> dbMovie.getType() == Type.movie && dbMovie.getFileName().equals(fileName))
                .findFirst().orElse(null);
    }

    public static boolean isNullSafe(TmdbResult.TmdbMovie movieJson, String logDetails) {
        boolean result = true;
        if (movieJson == null) {
            log.warn("no movie found in tmdb | {}", logDetails);
            result = false;
        }
        return result;
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
