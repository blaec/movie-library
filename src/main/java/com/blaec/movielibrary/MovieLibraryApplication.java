package com.blaec.movielibrary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan("com.blaec.movielibrary.configs")
public class MovieLibraryApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieLibraryApplication.class, args);
    }

}
