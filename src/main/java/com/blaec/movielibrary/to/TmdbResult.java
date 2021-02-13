package com.blaec.movielibrary.to;

import lombok.AllArgsConstructor;
import lombok.Getter;

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
    }
}
