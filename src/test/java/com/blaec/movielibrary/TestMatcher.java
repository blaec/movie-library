package com.blaec.movielibrary;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import org.springframework.test.web.servlet.ResultMatcher;

import static com.blaec.movielibrary.TestUtils.readListFromJsonMvcResult;
import static org.assertj.core.api.Assertions.assertThat;

public class TestMatcher {
    private final String[] fieldsToIgnore;

    private TestMatcher(String... fieldsToIgnore) {
        this.fieldsToIgnore = fieldsToIgnore;
    }

    public static TestMatcher createInstance(String... fieldsToIgnore) {
        return new TestMatcher(fieldsToIgnore);
    }

    public void assertContainAll(Iterable<Movie> actual, Iterable<Movie> expected) {
        assertThat(actual)
                .usingElementComparatorIgnoringFields(fieldsToIgnore)
                .containsAll(expected);
    }

    public void assertNotContainAny(Iterable<Movie> actual, Iterable<Movie> expected) {
        assertThat(actual)
                .usingElementComparatorIgnoringFields(fieldsToIgnore)
                .doesNotContainAnyElementsOf(expected);
    }

    public void assertNotEmpty(Iterable<Movie> actual) {
        assertThat(actual).isNotEmpty();
    }

    public void assertAllMatchByField(Iterable<Movie> actual, Type expected) {
        assertThat(actual)
                .allMatch(movie -> movie.getType() == expected);
    }

    public void assertNoneMatchByField(Iterable<Movie> actual, Type expected) {
        assertThat(actual)
                .noneMatch(movie -> movie.getType() == expected);
    }

    public ResultMatcher containsAll(Iterable<Movie> expected) {
        return result -> assertContainAll(readListFromJsonMvcResult(result), expected);
    }

    public ResultMatcher notContainsAny(Iterable<Movie> expected) {
        return result -> assertNotContainAny(readListFromJsonMvcResult(result), expected);
    }

    public ResultMatcher notEmpty() {
        return result -> assertNotEmpty(readListFromJsonMvcResult(result));
    }

    public ResultMatcher containsAllWithType(Type expected) {
        return result -> assertAllMatchByField(readListFromJsonMvcResult(result), expected);
    }

    public ResultMatcher notContainsAnyWithType(Type expected) {
        return result -> assertNoneMatchByField(readListFromJsonMvcResult(result), expected);
    }
}
