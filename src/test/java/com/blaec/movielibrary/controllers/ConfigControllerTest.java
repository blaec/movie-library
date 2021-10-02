package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.configs.OmdbApiConfig;
import com.blaec.movielibrary.configs.TmdbApiConfig;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static com.blaec.movielibrary.controllers.ConfigController.URL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class ConfigControllerTest extends AbstractControllerTest {

    @Autowired
    private TmdbApiConfig tmdbApiConfig;

    @Autowired
    private OmdbApiConfig omdbApiConfig;

    @Test
    @Order(10)
    public void contextLoads() {
        assertThat(tmdbApiConfig).isNotNull();
        assertThat(omdbApiConfig).isNotNull();
    }

    @Test
    @Order(20)
    void getConfigs() throws Exception {
        ResultActions resultActions = perform(MockMvcRequestBuilders.get(URL));
        validate(resultActions)
                .andExpect(jsonPath("$.tmdbApiKey").value(tmdbApiConfig.getValue().getApikey()))
                .andExpect(jsonPath("$.omdbApiKey").value(omdbApiConfig.getValue().getApikey()));
    }
}