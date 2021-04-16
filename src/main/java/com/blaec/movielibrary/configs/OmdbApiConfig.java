package com.blaec.movielibrary.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Data
@ConfigurationProperties(prefix = "omdbapi")
@ConstructorBinding
public class OmdbApiConfig{
    private final String endpoint;
    private final OmdbApiConfig.Name name;
    private final OmdbApiConfig.Value value;

    @Data
    public static class Name{
        private final String title;
        private final String year;
        private final String id;
        private final String apikey;
    }

    @Data
    public static class Value{
        private final String apikey;
    }
}
