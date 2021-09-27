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

    public void assertContainAll(Iterable<Movie> actual, Iterable<Movie> expected) {
        final String[] ignoreFields = {
                "id",
                "releaseDate",
                "posterPath",
                "posterPathRu",
                "genres",
                "size",
                "location",
                "creationDate"
        };
        assertThat(actual)
                .usingElementComparatorIgnoringFields(ignoreFields)
                .containsAll(expected);
    }

    public ResultMatcher contentJson(Iterable<Movie> expected) {
        return result -> assertContainAll(readListFromJsonMvcResult(result), expected);
    }
}
