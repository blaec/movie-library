package com.blaec.movielibrary;

import com.blaec.movielibrary.model.Movie;
import org.springframework.test.web.servlet.ResultMatcher;

import static com.blaec.movielibrary.TestUtils.readListFromJsonMvcResult;
import static org.assertj.core.api.Assertions.assertThat;

public class TestMatcher {
    private TestMatcher() {
    }

    public static TestMatcher getInstance() {
        return new TestMatcher();
    }

    public void assertMatch(Iterable<Movie> actual, Iterable<Movie> expected) {
        assertThat(actual).isEqualTo(expected);
    }

    public ResultMatcher contentJson(Iterable<Movie> expected) {
        return result -> assertMatch(readListFromJsonMvcResult(result), expected);
    }
}
