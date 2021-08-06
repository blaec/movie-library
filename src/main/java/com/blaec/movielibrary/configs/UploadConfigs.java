package com.blaec.movielibrary.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Data
@ConfigurationProperties(prefix = "upload")
@ConstructorBinding
public class UploadConfigs {
    private String cartoons;
    private String movies;
    private String serialMovies;
    private String music;
    private String videos;
}
