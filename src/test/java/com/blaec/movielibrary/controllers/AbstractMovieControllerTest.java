package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.TestMatcher;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.json.SingleFileUpload;
import com.blaec.movielibrary.utils.JsonUtil;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Set;

import static com.blaec.movielibrary.MovieTestData.IGNORED_FIELDS;
import static com.blaec.movielibrary.controllers.MovieController.URL;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

public class AbstractMovieControllerTest extends AbstractControllerTest {
    protected TestMatcher getTestMatcher() {
        return TestMatcher.createInstance(IGNORED_FIELDS);
    }

    protected void getAllByType(String path, Type expected, Type missing) throws Exception {
        final String url = String.format("%s/%s", URL, path);

        TestMatcher matcher = getTestMatcher();
        ResultActions resultActions = perform(MockMvcRequestBuilders.get(url));
        validate(resultActions)
                .andExpect(jsonPath("$.*").isNotEmpty())
                .andExpect(matcher.containsAllWithType(expected))
                .andExpect(matcher.notContainsAnyWithType(missing));
    }

    protected ResultActions resultActionsForGetAllByGenres(Set<Integer> genres) throws Exception {
        final String url = String.format("%s/filter", URL);

        return perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(genres)));
    }

    protected ResultActions resultActionsForUploadMovie(SingleFileUpload singleFileUpload) throws Exception {
        final String url = String.format("%s/upload/file", URL);

        return perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.writeValue(singleFileUpload)));
    }

    protected ResultActions resultActionsForDelete(int tmdbId) throws Exception {
        final String url = String.format("%s/delete/%d", URL, tmdbId);

        return perform(MockMvcRequestBuilders.delete(url));
    }
}
