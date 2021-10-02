package com.blaec.movielibrary.configs;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Configs {
    String tmdbApiKey;
    String omdbApiKey;

    public static Configs of(TmdbApiConfig tmdbApiConfig, OmdbApiConfig omdbApiConfig) {
        return new Configs(
                tmdbApiConfig.getValue().getApikey(),
                omdbApiConfig.getValue().getApikey()
        );
    }
}
