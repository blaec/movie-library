package com.blaec.movielibrary.utils;

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

    /**
     * Check by fileName if movie already saved to database
     *
     * @param fileName movie file name
     * @param dbMovies database movies
     * @return true if movie exists in database
     */
    public static boolean isMovieSaved(String fileName, Iterable<Movie> dbMovies) {
        return StreamSupport.stream(dbMovies.spliterator(), false)
                .anyMatch(dbMovie -> dbMovie.getFileName().equals(fileName));
    }

    public static boolean isNullSave(TmdbResult.TmdbMovie movieJson, String logDetails) {
        boolean result = true;
        if (movieJson == null) {
            log.warn("no movie found in tmdb | {}", logDetails);
            result = false;
        }
        return result;
    }
}
