package com.blaec.movielibrary.to;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MovieJsonObject {
    // property names should match the json names, required for mapping
    private final String Title;
    private final String Year;
    private final String Rated;
    private final String Runtime;
    private final String Genre;
    private final String Actors;
    private final String Language;
    private final String Awards;
    private final String imdbRating;
    private final String imdbID;
    private final String Poster;
    private final String imdbVotes;
    private final String Type;

    @Override
    public String toString() {
        return String.format("%s (%s)", Title, Year);
    }
}
