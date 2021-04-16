package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.configs.Configs;
import com.blaec.movielibrary.configs.OmdbApiConfig;
import com.blaec.movielibrary.configs.TmdbApiConfig;
import com.google.common.collect.ImmutableList;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RequestMapping("/configs")
@CrossOrigin(origins = "*")
@RestController
public class ConfigController {
    private final OmdbApiConfig omdbApiConfig;
    private final TmdbApiConfig tmdbApiConfig;

    @GetMapping()
    public List<Configs> getTmdbConfig() {
        return ImmutableList.of(tmdbApiConfig, omdbApiConfig);
    }
}
