package com.blaec.movielibrary.to;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
}
