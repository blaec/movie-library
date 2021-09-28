package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.TestMatcher;
import com.blaec.movielibrary.services.MovieService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static com.blaec.movielibrary.MovieTestData.IGNORED_FIELDS;
import static com.blaec.movielibrary.MovieTestData.MOVIES;
import static com.blaec.movielibrary.controllers.MovieController.URL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class MovieControllerTest extends AbstractControllerTest {

    @Autowired
    private MovieService movieService;

    @Test
    public void contextLoads() throws Exception {
        assertThat(movieService).isNotNull();
    }

    @Test
    void getAll() throws Exception {
        perform(MockMvcRequestBuilders.get(URL + "/library"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(TestMatcher.getInstance(IGNORED_FIELDS).containsAll(MOVIES));
    }

    @Test
    void getAllMovies() throws Exception {
    }

    @Test
    void getAllWishMovies() {
    }

    @Test
    void getAllByGenres() {
    }

    @Test
    void uploadFromFolder() {
    }

    @Test
    void uploadMovie() {
    }

    @Test
    void saveWishMovie() {
    }

    @Test
    void delete() {
    }
}