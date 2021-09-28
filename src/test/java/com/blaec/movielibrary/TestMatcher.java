package com.blaec.movielibrary;

import com.blaec.movielibrary.model.Movie;
import org.springframework.test.web.servlet.ResultMatcher;

import static com.blaec.movielibrary.TestUtils.readListFromJsonMvcResult;
import static org.assertj.core.api.Assertions.assertThat;

public class TestMatcher {
    private final String[] fieldsToIgnore;

    private TestMatcher(String... fieldsToIgnore) {
        this.fieldsToIgnore = fieldsToIgnore;
    }

    public static TestMatcher getInstance(String... fieldsToIgnore) {
        return new TestMatcher(fieldsToIgnore);
    }

    public void assertContainAll(Iterable<Movie> actual, Iterable<Movie> expected) {
        assertThat(actual)
                .usingElementComparatorIgnoringFields(fieldsToIgnore)
                .containsAll(expected);
    }

    public ResultMatcher containsAll(Iterable<Movie> expected) {
        return result -> assertContainAll(readListFromJsonMvcResult(result), expected);
    }
}
