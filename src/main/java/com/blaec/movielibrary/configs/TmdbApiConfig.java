package com.blaec.movielibrary.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Data
@ConfigurationProperties(prefix = "tmdbapi")
@ConstructorBinding
public class TmdbApiConfig{
    private final TmdbApiConfig.Endpoint endpoint;
    private final TmdbApiConfig.Name name;
    private final TmdbApiConfig.Value value;

    @Data
    public static class Endpoint{
        private final String search;
        private final String movie;
    }

    @Data
    public static class Name{
        private final String title;
        private final String year;
        private final String language;
        private final String apikey;
    }

    @Data
    public static class Value{
        private final String language;
        private final String languageRu;
        private final String apikey;
    }
}
