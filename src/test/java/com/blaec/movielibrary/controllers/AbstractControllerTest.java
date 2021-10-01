package com.blaec.movielibrary.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;

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
}
