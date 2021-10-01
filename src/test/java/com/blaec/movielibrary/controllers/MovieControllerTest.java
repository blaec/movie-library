package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.TestMatcher;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.json.SingleFileUpload;
import com.blaec.movielibrary.services.MovieService;
import com.blaec.movielibrary.utils.JsonUtil;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Set;

import static com.blaec.movielibrary.MovieTestData.*;
import static com.blaec.movielibrary.controllers.MovieController.URL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


class MovieControllerTest extends AbstractControllerTest {

    @Autowired
    private MovieService movieService;

    public static final String SUCCESS_MESSAGE = "Successfully saved";

    @Test
    @Order(10)
    public void contextLoads() {
        assertThat(movieService).isNotNull();
    }

    @Test
    @Order(20)
    void getAll() throws Exception {
        TestMatcher matcher = getTestMatcher();
        ResultActions resultActions = perform(MockMvcRequestBuilders.get(URL + "/library"));
        validate(resultActions)
                .andExpect(jsonPath("$.*").isNotEmpty())
                .andExpect(matcher.containsAll(MOVIES));
    }

    @Test
    @Order(21)
    void getAllMovies() throws Exception {
        getAllByType("/gallery", Type.movie, Type.wish_list);
    }

    @Test
    @Order(22)
    void getAllWishMovies() throws Exception {
        getAllByType("/wishlist", Type.wish_list, Type.movie);
    }

    private void getAllByType(String path, Type expected, Type missing) throws Exception {
        TestMatcher matcher = getTestMatcher();
        ResultActions resultActions = perform(MockMvcRequestBuilders.get(URL + path));
        validate(resultActions)
                .andExpect(jsonPath("$.*").isNotEmpty())
                .andExpect(matcher.containsAllWithType(expected))
                .andExpect(matcher.notContainsAnyWithType(missing));
    }

    @Test
    @Order(23)
    void getAllByGenres() throws Exception {
        final Set<Integer> genres = Set.of(14, 80);
        final List<Movie> expected = List.of(MOVIE_2, MOVIE_1);
        final List<Movie> notExpected = List.of(MOVIE_3);

        TestMatcher matcher = getTestMatcher();
        validate(getAllFilteredByGenres(genres))
                .andExpect(jsonPath("$.*").isNotEmpty())
                .andExpect(matcher.containsAllWithType(Type.movie))
                .andExpect(matcher.notContainsAnyWithType(Type.wish_list))
                .andExpect(matcher.containsAll(expected))
                .andExpect(matcher.notContainsAny(notExpected));
    }

    @Test
    @Order(24)
    void getAllByNonExistingGenres() throws Exception {
        final Set<Integer> genres = Set.of(99, 10770);

        validate(getAllFilteredByGenres(genres))
                .andExpect(jsonPath("$.*").isEmpty());
    }

    @Test
    @Order(25)
    void getAllByEmptyGenres() throws Exception {
        final Set<Integer> genres = Collections.emptySet();

        validate(getAllFilteredByGenres(genres))
                .andExpect(jsonPath("$.*").isEmpty());
    }

    private ResultActions getAllFilteredByGenres(Set<Integer> genres) throws Exception {
        return perform(MockMvcRequestBuilders.post(URL + "/filter")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(genres)));
    }

    @Test
    @Order(30)
   void uploadFromFolder() throws Exception {
        ResultActions resultActions = perform(MockMvcRequestBuilders.post(URL + "/upload/music"));
        validate(resultActions)
                .andExpect(jsonPath("$.*").isNotEmpty())
                .andExpect(jsonPath("$[*].message", hasItems(SUCCESS_MESSAGE)))
                .andExpect(jsonPath("$[*].success", hasItems(true)));
    }

    @Test
    @Order(40)
    void uploadMovie() throws Exception {
        SingleFileUpload singleFileUpload = new SingleFileUpload("serialMovies", "337170", "American Made (2017) [1080p].mkv");
        ResultActions resultActions = perform(MockMvcRequestBuilders.post(URL + "/upload/file")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(singleFileUpload)));
        validate(resultActions)
                .andExpect(jsonPath("$.tmbdId").value(singleFileUpload.getTmdbId()))
                .andExpect(jsonPath("$.title").value("American Made"))
                .andExpect(jsonPath("$.message").value(SUCCESS_MESSAGE))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @Order(50)
    void saveWishMovie() throws Exception {
        ResultActions resultActions = perform(MockMvcRequestBuilders.post(URL + "/upload/wish")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(TMDB_WISH_MOVIE)));
        validate(resultActions)
                .andExpect(jsonPath("$.tmbdId").value(TMDB_WISH_MOVIE.getId()))
                .andExpect(jsonPath("$.title").value(TMDB_WISH_MOVIE.getTitle()))
                .andExpect(jsonPath("$.message").value(SUCCESS_MESSAGE))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @Order(60)
    void delete() throws Exception {
        ResultActions resultActions = perform(MockMvcRequestBuilders.delete(URL + "/delete/" + "19995"));
        validate(resultActions)
                .andExpect(jsonPath("$.tmbdId").value(MOVIE_2.getTmdbId()))
                .andExpect(jsonPath("$.title").value(MOVIE_2.getTitle()))
                .andExpect(jsonPath("$.message", startsWith("deleted | #19995 Avatar (2009-12-10)")))
                .andExpect(jsonPath("$.success").value(true));
    }
}