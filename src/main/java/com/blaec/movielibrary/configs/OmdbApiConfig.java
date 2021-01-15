package com.blaec.movielibrary.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Data
@ConfigurationProperties(prefix = "omdbapi")
@ConstructorBinding
public class OmdbApiConfig {
    private final String endpoint;
    private final String titleName;
    private final String yearName;
    private final String idName;
    private final String apikeyName;
    private final String apikeyValue;
}
