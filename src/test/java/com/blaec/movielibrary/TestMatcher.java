package com.blaec.movielibrary;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import org.springframework.test.web.servlet.ResultMatcher;

import static com.blaec.movielibrary.TestUtils.readListFromJsonMvcResult;
import static org.assertj.core.api.Assertions.assertThat;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TestMatcher {
    private final String[] fieldsToIgnore;

    public static TestMatcher createInstance(String... fieldsToIgnore) {
        return new TestMatcher(fieldsToIgnore);
    }


    public ResultMatcher containsAll(Iterable<Movie> expected) {
        return result -> assertContainAll(readListFromJsonMvcResult(result), expected);
    }

    private void assertContainAll(Iterable<Movie> actual, Iterable<Movie> expected) {
        assertThat(actual)
                .usingElementComparatorIgnoringFields(fieldsToIgnore)
                .containsAll(expected);
    }

    public ResultMatcher notContainsAny(Iterable<Movie> expected) {
        return result -> assertNotContainAny(readListFromJsonMvcResult(result), expected);
    }

    private void assertNotContainAny(Iterable<Movie> actual, Iterable<Movie> expected) {
        assertThat(actual)
                .usingElementComparatorIgnoringFields(fieldsToIgnore)
                .doesNotContainAnyElementsOf(expected);
    }

    public ResultMatcher containsAllWithType(Type expected) {
        return result -> assertAllMatchByField(readListFromJsonMvcResult(result), expected);
    }

    private void assertAllMatchByField(Iterable<Movie> actual, Type expected) {
        assertThat(actual)
                .allMatch(movie -> movie.getType() == expected);
    }

    public ResultMatcher notContainsAnyWithType(Type expected) {
        return result -> assertNoneMatchByField(readListFromJsonMvcResult(result), expected);
    }

    private void assertNoneMatchByField(Iterable<Movie> actual, Type expected) {
        assertThat(actual)
                .noneMatch(movie -> movie.getType() == expected);
    }

}
