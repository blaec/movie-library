package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.TestMatcher;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.services.MovieService;
import com.blaec.movielibrary.utils.JsonUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Set;

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
        TestMatcher matcher = TestMatcher.getInstance(IGNORED_FIELDS);
        perform(MockMvcRequestBuilders.get(URL + "/library"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(matcher.notEmpty())
                .andExpect(matcher.containsAll(MOVIES));
    }

    @Test
    void getAllMovies() throws Exception {
        TestMatcher matcher = TestMatcher.getInstance(IGNORED_FIELDS);
        perform(MockMvcRequestBuilders.get(URL + "/gallery"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(matcher.notEmpty())
                .andExpect(matcher.containsAllWithType(Type.movie))
                .andExpect(matcher.notContainsAnyWithType(Type.wish_list));
    }

    @Test
    void getAllWishMovies() throws Exception {
        TestMatcher matcher = TestMatcher.getInstance(IGNORED_FIELDS);
        perform(MockMvcRequestBuilders.get(URL + "/wishlist"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(matcher.notEmpty())
                .andExpect(matcher.containsAllWithType(Type.wish_list))
                .andExpect(matcher.notContainsAnyWithType(Type.movie));
    }

    @Test
    void getAllByGenres() throws Exception {
        TestMatcher matcher = TestMatcher.getInstance(IGNORED_FIELDS);
        Set<Integer> genres = Set.of(12, 28);
        perform(MockMvcRequestBuilders.post(URL + "/filter")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(genres)))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(matcher.notEmpty())
                .andExpect(matcher.containsAllWithType(Type.movie))
                .andExpect(matcher.notContainsAnyWithType(Type.wish_list))
                .andExpect(matcher.containsAll(MOVIES));
    }

    @Test
    void uploadFromFolder() throws Exception {
    }

    @Test
    void uploadMovie() throws Exception {
    }

    @Test
    void saveWishMovie() throws Exception {
    }

    @Test
    void delete() throws Exception {
    }
}