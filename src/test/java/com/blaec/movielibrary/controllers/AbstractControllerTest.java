package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.TestMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import static com.blaec.movielibrary.MovieTestData.IGNORED_FIELDS;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Can't use application.yaml with test settings in resource folder -
 * because it's settings are overridden by same file from config folder
 */
@TestPropertySource(
        properties = {
                "spring.datasource.url=jdbc:mysql://localhost:3306/dummy_movie_library?serverTimezone=UTC",
        }
)

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class AbstractControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    protected ResultActions perform(MockHttpServletRequestBuilder builder) throws Exception {
        return mockMvc.perform(builder);
    }

    protected ResultActions validate(ResultActions resultActions) throws Exception {
        return resultActions
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    protected TestMatcher getTestMatcher() {
        return TestMatcher.createInstance(IGNORED_FIELDS);
    }
}
