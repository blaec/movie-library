package com.blaec.movielibrary.model.json;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class TmdbResult {
    private final List<TmdbMovie> results;

    @Getter
    @AllArgsConstructor
    public static class TmdbMovie {
        private final String id;
        private final String title;
        private final String release_date;
        private final String poster_path;
        @Setter
        private List<Integer> genre_ids;
        private final List<Genre> genres;

        @Override
        public String toString() {
            return String.format("#%s %s (%s)", id, title, release_date);
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Genre{
        private final String id;
        private final String name;
    }

    /**
     * Convert parameter genres in TmdbMovie into genre_ids
     */
    public static TmdbResult.TmdbMovie convertGenres(TmdbResult.TmdbMovie movie) {
        movie.setGenre_ids(movie.getGenres().stream()
                .map(genre -> Integer.valueOf(genre.getId()))
                .collect(Collectors.toList())
        );
        return movie;
    }
}
