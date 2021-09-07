package com.blaec.movielibrary.model.json;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SingleFileUpload {
    private final String location;
    private final String tmdbId;
    private final String fileName;

    @Override
    public String toString() {
        return String.format("%s - %s from %s", tmdbId, fileName, location);
    }
}
