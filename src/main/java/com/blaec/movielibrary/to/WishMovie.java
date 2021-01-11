package com.blaec.movielibrary.to;

import lombok.Data;

@Data
public class WishMovie {
    private final String imdbId;
    private final String title;
    private final int year;
    private final String rated;
    private final int runtime;
    private final String genre;
    private final String actors;
    private final String language;
    private final String awards;
    private final double imdbRating;
    private final String poster;
    private final int imbdVotes;
}
