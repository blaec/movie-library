package com.blaec.movielibrary.utils;

import com.blaec.movielibrary.configs.TmdbApiConfig;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.TmdbResult;
import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class TmdbApiUtils {
    private static TmdbApiConfig tmdbApiConfig;
    private static final Gson gson = new Gson();

    private final TmdbApiConfig apiConfig;

    @PostConstruct
    private void init() {
        tmdbApiConfig = this.apiConfig;
    }

    /**
     * Create request api url from movie file object (name and year)
     * sample url: https://api.themoviedb.org/3/search/movie?api_key=33ca5cbc&query=Aladdin&primary_release_year=2019
     *
     * @param movieFileTo movie file object
     * @return url for api-request by title and year
     */
    public static String getUrlByNameAndYear(MovieFileTo movieFileTo) {
        String params = joinParams(ImmutableMap.of(
                tmdbApiConfig.getName().getTitle(), movieFileTo.getNameUrlStyled(),
                tmdbApiConfig.getName().getYear(), String.valueOf(movieFileTo.getYear()),
                tmdbApiConfig.getName().getApikey(), tmdbApiConfig.getValue().getApikey()));
        return String.format("%s?%s", tmdbApiConfig.getEndpoint().getSearch(), params);
    }

    /**
     * Create request api url from tmdb id
     * sample url: https://api.themoviedb.org/3/movie/9487?api_key=33ca5cbc
     *
     * @param id tmdb id
     * @return url for api-request by id
     */
    public static String getUrlById(String id){
        String params = joinParams(ImmutableMap.of(
                tmdbApiConfig.getName().getApikey(), tmdbApiConfig.getValue().getApikey()));
        return String.format("%s/%s?%s", tmdbApiConfig.getEndpoint().getMovie(), id, params);
    }

    /**
     * Sends request to tmdb-api, gets json object and maps it on java class
     *
     * @param url url to required movie
     * @return TmdbResult or null if nothing's found
     */
    public static TmdbResult getMoviesResult(String url) {
        TmdbResult movieJson = null;
        try {
            HttpResponse<String> stringHttpResponse = sendRequest(url);
            movieJson = gson.fromJson(stringHttpResponse.body(), TmdbResult.class);
        } catch (IOException | InterruptedException e) {
            log.error("Failed to get imdb movie data from url {}", url);
        }
        return movieJson;
    }

    /**
     * Sends request to tmdb-api, gets json object and maps it on java class
     *
     * @param url url to required movie
     * @return TmdbResult.TmdbMovie or null if nothing's found
     */
    public static TmdbResult.TmdbMovie getMovie(String url) {
        TmdbResult.TmdbMovie movieJson = null;
        try {
            HttpResponse<String> stringHttpResponse = sendRequest(url);
            movieJson = gson.fromJson(stringHttpResponse.body(), TmdbResult.TmdbMovie.class);
        } catch (IOException | InterruptedException e) {
            log.error("Failed to get imdb movie data from url {}", url);
        }
        return movieJson;
    }

    /**
     * Convert map with key-value parameters into string like key1=value1&key2=value2...
     *
     * @param params map with key-value parameters
     * @return parameters string
     */
    private static String joinParams(Map<String, String> params) {
        return params.keySet().stream()
                .map(k -> String.format("%s=%s", k, params.get(k)))
                .collect(Collectors.joining("&"));
    }

    /**
     * Sends the given request using this client
     * http://zetcode.com/java/getpostrequest/
     *
     * @param url api url
     * @return the response
     * @throws IOException          if an I/O error occurs when sending or receiving
     * @throws InterruptedException if the operation is interrupted
     */
    public static HttpResponse<String> sendRequest(String url) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        return client.send(request, HttpResponse.BodyHandlers.ofString());
    }
}
