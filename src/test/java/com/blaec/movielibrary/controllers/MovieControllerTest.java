package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.TestMatcher;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.json.SingleFileUpload;
import com.blaec.movielibrary.services.MovieService;
import com.blaec.movielibrary.utils.JsonUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Set;

import static com.blaec.movielibrary.MovieTestData.*;
import static com.blaec.movielibrary.controllers.MovieController.URL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


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
        SingleFileUpload singleFileUpload = new SingleFileUpload("serialMovies", "337170", "American Made (2017) [1080p].mkv");
        perform(MockMvcRequestBuilders.post(URL + "/upload/file")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(singleFileUpload)))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void saveWishMovie() throws Exception {
        perform(MockMvcRequestBuilders.post(URL + "/upload/wish")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(TMDB_WISH_MOVIE)))
                .andExpect(jsonPath("$.tmbdId").value(TMDB_WISH_MOVIE.getId()))
                .andExpect(jsonPath("$.title").value(TMDB_WISH_MOVIE.getTitle()))
                .andExpect(jsonPath("$.message").value("Successfully saved"))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete() throws Exception {
    }
}