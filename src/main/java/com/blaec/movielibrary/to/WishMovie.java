package com.blaec.movielibrary.to;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WishMovie {
    private final String id;
    private final String title;
    private final String release_date;
    private final String poster_path;

    @Override
    public String toString() {
        return String.format("%s - %s (%s) with poster %s", id, title, release_date, poster_path);
    }
}

