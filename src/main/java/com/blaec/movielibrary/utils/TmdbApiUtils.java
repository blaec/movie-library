package com.blaec.movielibrary.utils;

import com.blaec.movielibrary.configs.TmdbApiConfig;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.TmdbResult;
import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
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
     * Get TmdbMovie from MovieFileTo by sending url, created from name and year, to api
     *
     * @param movieFileTo movie file object
     * @return TmdbMovie or null if not exist
     */
    public static TmdbResult.TmdbMovie getMovieByNameAndYear(MovieFileTo movieFileTo) {
        TmdbResult.TmdbMovie foundMovie = null;
        URL url = getUrlByNameAndYear(movieFileTo);
        if (url != null) {
            log.debug("{} | {}", movieFileTo.toString(), url);
            List<TmdbResult.TmdbMovie> results = TmdbApiUtils.getMoviesResult(url.toString()).getResults();
            foundMovie = results.stream().findFirst().orElse(null);
        }

        return foundMovie;
    }

    /**
     * Create request api url from movie file object (name and year)
     * sample url: https://api.themoviedb.org/3/search/movie?api_key=33ca5cbc&query=Aladdin&primary_release_year=2019
     *
     * @param movieFileTo movie file object
     * @return URL object or null
     */
    private static URL getUrlByNameAndYear(MovieFileTo movieFileTo) {

        // Get url
        URL url = null;
        try {
            URIBuilder b = new URIBuilder(tmdbApiConfig.getEndpoint().getSearch());
            b.addParameter(tmdbApiConfig.getName().getTitle(), movieFileTo.getNameUrlStyled());
            b.addParameter(tmdbApiConfig.getName().getYear(), String.valueOf(movieFileTo.getYear()));
            b.addParameter(tmdbApiConfig.getName().getApikey(), tmdbApiConfig.getValue().getApikey());
            url = b.build().toURL();
        } catch (URISyntaxException e) {
            log.error("wrong uri syntax {}", tmdbApiConfig.getEndpoint().getSearch(), e);
        } catch (MalformedURLException e) {
            log.error("malformed url {}", movieFileTo.toString(), e);
        } catch (Exception e) {
            log.error("error creating url for {}", movieFileTo.toString(), e);
        }

        return url;
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
