package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.configs.Configs;
import com.blaec.movielibrary.configs.OmdbApiConfig;
import com.blaec.movielibrary.configs.TmdbApiConfig;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@AllArgsConstructor
@RequestMapping(ConfigController.URL)
@RestController
public class ConfigController extends AbstractController {
    private final TmdbApiConfig tmdbApiConfig;
    private final OmdbApiConfig omdbApiConfig;

    static final String URL = API_VERSION + "/configs";

    @GetMapping()
    public Configs getConfigs() {
        return Configs.of(tmdbApiConfig, omdbApiConfig);
    }
}
