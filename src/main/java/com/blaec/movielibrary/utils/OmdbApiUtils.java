package com.blaec.movielibrary.utils;

import com.blaec.movielibrary.configs.OmdbApiConfig;
import com.blaec.movielibrary.to.MovieFileObject;
import com.blaec.movielibrary.to.MovieJsonObject;
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
public class OmdbApiUtils {
    private static OmdbApiConfig omdbApiConfig;
    private static final Gson gson = new Gson();

    private final OmdbApiConfig apiConfig;

    @PostConstruct
    private void init() {
        omdbApiConfig = this.apiConfig;
    }

    /**
     * Create request api url from movie file object (name and year)
     * sample url: http://www.omdbapi.com/?t=As+Good+as+It+Gets&y=1997&apikey=33ca5cbc
     *
     * @param movieFileObject movie file object
     * @return url for api-request by title
     */
    public static String getApiRequestUrl(MovieFileObject movieFileObject) {
        String params = joinParams(ImmutableMap.of(
                omdbApiConfig.getTitleName(), movieFileObject.getNameUrlStyled(),
                omdbApiConfig.getYearName(), String.valueOf(movieFileObject.getYear()),
                omdbApiConfig.getApikeyName(), omdbApiConfig.getApikeyValue()));
        return String.format("%s?%s", omdbApiConfig.getEndpoint(), params);
    }

    /**
     * Create request api url imdb id
     * sample url: http://www.omdbapi.com/?i=tt0378194&apikey=33ca5cbc
     *
     * @param id imdb id
     * @return url for api-request by imdb id
     */
    public static String getApiRequestUrl(String id) {
        String params = joinParams(ImmutableMap.of(
                omdbApiConfig.getIdName(), id,
                omdbApiConfig.getApikeyName(), omdbApiConfig.getApikeyValue()));
        return String.format("%s?%s", omdbApiConfig.getEndpoint(), params);
    }

    /**
     * Sends request to omdbapi, gets json object and maps it on java class
     *
     * @param url url to required movie
     * @return MovieJsonObject or null if nothing's found
     */
    public static MovieJsonObject getMovie(String url) {
        MovieJsonObject movieJson = null;
        try {
            HttpResponse<String> stringHttpResponse = sendRequest(url);
            movieJson = gson.fromJson(stringHttpResponse.body(), MovieJsonObject.class);
        } catch (IOException | InterruptedException e) {
            log.error("Failed to get imdb movie data from url {}", url, e);
        }
        return movieJson;
    }

//    /**
//     * Get location with movie files
//     *
//     * @return map with key - for location description and value - for path to file location
//     */
//    public static Map<String, String> getFileLocations() {
//        return INSTANCE.locations;
//    }

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
        // TODO handle exception for example upload imdb-id ZAP%n%s%n%s%n%s%n%s%n%s%n%s%n%s%n%s
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        return client.send(request, HttpResponse.BodyHandlers.ofString());
    }
}
