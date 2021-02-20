package com.blaec.movielibrary.to;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SingleFileUpload {
    private final String location;
    private final String tmdbId;
    private final String fileName;
}
