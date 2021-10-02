package com.blaec.movielibrary;

import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.utils.JsonUtil;
import lombok.experimental.UtilityClass;
import org.springframework.test.web.servlet.MvcResult;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@UtilityClass
public class TestUtils {

    public static List<Movie> readListFromJsonMvcResult(MvcResult result) throws IOException {
        return JsonUtil.readValues(getContent(result), Movie.class);
    }

    private static String getContent(MvcResult result) throws UnsupportedEncodingException {
        return result.getResponse().getContentAsString();
    }
}
