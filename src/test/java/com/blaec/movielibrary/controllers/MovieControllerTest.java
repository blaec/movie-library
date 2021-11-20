package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.TestMatcher;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.json.SingleFileUpload;
import com.blaec.movielibrary.services.MovieService;
import com.blaec.movielibrary.utils.JsonUtil;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.StreamSupport;

import static com.blaec.movielibrary.MovieTestData.*;
import static com.blaec.movielibrary.controllers.MovieController.URL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


class MovieControllerTest extends AbstractMovieControllerTest {

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
        final String url = String.format("%s/library", URL);

        TestMatcher matcher = getTestMatcher();
        ResultActions resultActions = perform(MockMvcRequestBuilders.get(url));
        validate(resultActions)
                .andExpect(jsonPath("$.*").isNotEmpty())
                .andExpect(matcher.containsAll(MOVIES));
    }

    @Test
    @Order(21)
    void getAllMovies() throws Exception {
        getAllByType("gallery", Type.movie, Type.wish_list);
    }

    @Test
    @Order(22)
    void getAllWishMovies() throws Exception {
        getAllByType("wishlist", Type.wish_list, Type.movie);
    }

    @Test
    @Order(23)
    void getAllByGenres() throws Exception {
        final Set<Integer> genres = Set.of(14, 80);
        final List<Movie> expected = List.of(MOVIE_2, MOVIE_1);
        final List<Movie> notExpected = List.of(MOVIE_3);

        TestMatcher matcher = getTestMatcher();
        validate(resultActionsForGetAllByGenres(genres))
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

        validate(resultActionsForGetAllByGenres(genres))
                .andExpect(jsonPath("$.*").isEmpty());
    }

    @Test
    @Order(25)
    void getAllByEmptyGenres() throws Exception {
        final Set<Integer> genres = Collections.emptySet();

        validate(resultActionsForGetAllByGenres(genres))
                .andExpect(jsonPath("$.*").isEmpty());
    }

    @Test
    @Order(30)
    void uploadFromFolder() throws Exception {
        final String folder = "music";
        final String url = String.format("%s/upload/%s", URL, folder);

        ResultActions resultActions = perform(MockMvcRequestBuilders.post(url));
        validate(resultActions)
                .andExpect(jsonPath("$.*").isNotEmpty())
                .andExpect(jsonPath("$[*].message", hasItems("Already exist")))
                .andExpect(jsonPath("$[*].message", hasItems(SUCCESS_MESSAGE)))
                .andExpect(jsonPath("$[*].success", hasItems(true)));
    }

    @Test
    @Order(40)
    void uploadMovie() throws Exception {
        final int tmdbId = 337170;
        final String location = "serialMovies";
        final String fileName = "American Made (2017) [1080p].mkv";
        final SingleFileUpload singleFileUpload = new SingleFileUpload(location, String.valueOf(tmdbId), fileName);
        final String expectedTitle = "American Made";

        validate(resultActionsForUploadMovie(singleFileUpload))
                .andExpect(jsonPath("$.tmbdId").value(tmdbId))
                .andExpect(jsonPath("$.title").value(expectedTitle))
                .andExpect(jsonPath("$.message").value(SUCCESS_MESSAGE))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @Order(41)
    void uploadMovieWithMissingFileName() throws Exception {
        final int tmdbId = 337170;
        final String location = "serialMovies";
        final String fileName = "2..22 (2017) [1080p].mkv";
        final SingleFileUpload singleFileUpload = new SingleFileUpload(location, String.valueOf(tmdbId), fileName);

        validate(resultActionsForUploadMovie(singleFileUpload))
                .andExpect(jsonPath("$.tmbdId").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.title").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.message").value("Not found at all or more than one movie found"))
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @Order(42)
    void uploadMovieWithExistingMismatchingFileName() throws Exception {
        final int tmdbId = 337170;
        final String location = "serialMovies";
        final String mismatchingFileName = "Oblivion (2013) [1080p] [60fps].mkv";
        final SingleFileUpload singleFileUpload = new SingleFileUpload(location, String.valueOf(tmdbId), mismatchingFileName);
        final String expectedTitle = "American Made";

        // TODO should expect failure
        validate(resultActionsForUploadMovie(singleFileUpload))
                .andExpect(jsonPath("$.tmbdId").value(tmdbId))
                .andExpect(jsonPath("$.title").value(expectedTitle))
                .andExpect(jsonPath("$.message").value("Successfully saved"))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.validTitle").value(false));
    }

    @Test
    @Order(43)
    void uploadMovieWithWrongTmdbId() throws Exception {
        final int wrongTmdbId = -1;
        final String location = "serialMovies";
        final String fileName = "American Made (2017) [1080p].mkv";
        final SingleFileUpload singleFileUpload = new SingleFileUpload(location, String.valueOf(wrongTmdbId), fileName);

        validate(resultActionsForUploadMovie(singleFileUpload))
                .andExpect(jsonPath("$.tmbdId").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.title").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.message").value("passed null json object"))
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @Order(50)
    void saveWishMovie() throws Exception {
        final String url = String.format("%s/upload/wish", URL);

        ResultActions resultActions = perform(MockMvcRequestBuilders.post(url)
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
    void updatePosters() throws Exception {
        final String tmdbId = "19995";
        final String url = String.format("%s/update-movie-posters", URL);

        Movie dbMovie = StreamSupport.stream(movieService.getAll().spliterator(), false)
                .filter(movie ->  tmdbId.equals(movie.getTmdbId()))
                .findAny().orElseThrow();
        dbMovie.updatePosters("/poster-en", "/poster-ru");
        ResultActions resultActions = perform(MockMvcRequestBuilders.put(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(dbMovie)));
        validate(resultActions)
                .andExpect(jsonPath("$.message").value("Poster successfully updated"))
                .andExpect(jsonPath("$.success").value(true))
        ;
    }

    @Test
    @Order(70)
    void delete() throws Exception {
        final int tmdbId = 19995;

        validate(resultActionsForDelete(tmdbId))
                .andExpect(jsonPath("$.tmbdId").value(MOVIE_2.getTmdbId()))
                .andExpect(jsonPath("$.title").value(MOVIE_2.getTitle()))
                .andExpect(jsonPath("$.message", startsWith("deleted | #19995 Avatar (2009-12-10)")))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @Order(71)
    void deleteWithWrongTmdbId() throws Exception {
        final int tmdbId = -1;

        validate(resultActionsForDelete(tmdbId))
                .andExpect(jsonPath("$.tmbdId").value(tmdbId))
                .andExpect(jsonPath("$.title").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.message", startsWith("Can't delete movie, wrong tmdbId:")))
                .andExpect(jsonPath("$.success").value(false));
    }
}