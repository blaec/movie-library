package com.blaec.movielibrary.utils;

import com.blaec.movielibrary.configs.TmdbApiConfig;
import com.blaec.movielibrary.enums.Language;
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
import java.util.Optional;

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
     * Get map of TmdbMovies from MovieFileTo with different languages
     *
     * @param movieFile movieTO file for uploading
     * @return map of TmdbMovies with different languages
     */
    public static Map<Language, Optional<TmdbResult.TmdbMovie>> getMoviesByNameAndYear(MovieFileTo movieFile) {
        return ImmutableMap.of(
                Language.EN, TmdbApiUtils.getMovieByNameAndYear(movieFile, Language.EN),
                Language.RU, TmdbApiUtils.getMovieByNameAndYear(movieFile, Language.RU)
        );
    }

    /**
     * Get TmdbMovie from MovieFileTo by sending url, created from name and year, to api
     *
     * @param movieFileTo movie file object
     * @param language    json language
     * @return Optional of TmdbMovie
     */
    private static Optional<TmdbResult.TmdbMovie> getMovieByNameAndYear(MovieFileTo movieFileTo, Language language) {
        TmdbResult.TmdbMovie foundMovie = null;
        Optional<URL> url = getUrlByNameAndYear(movieFileTo, language.getLanguageCode(tmdbApiConfig));
        if (url.isPresent()) {
            log.debug("{} | {}", movieFileTo.toString(), url.get());
            List<TmdbResult.TmdbMovie> results = TmdbApiUtils.getMoviesResult(url.get().toString()).getResults();
            foundMovie = results.stream().findFirst().orElse(null);
        }

        return Optional.ofNullable(foundMovie);
    }

    /**
     * Get map of TmdbMovies with different languages by tmdbId
     *
     * @param tmdbMovie tmdbMovie
     * @return map of TmdbMovies with different languages
     */
    public static Map<Language, Optional<TmdbResult.TmdbMovie>> getMoviesById(TmdbResult.TmdbMovie tmdbMovie) {
        return ImmutableMap.of(
                Language.EN, TmdbApiUtils.getMovieById(tmdbMovie.getId(), Language.EN),
                Language.RU, TmdbApiUtils.getMovieById(tmdbMovie.getId(), Language.RU)
        );
    }

    /**
     * Get map of TmdbMovies with different languages by tmdbId
     *
     * @param tmdbId tmdb id
     * @return map of TmdbMovies with different languages
     */
    public static Map<Language, Optional<TmdbResult.TmdbMovie>> getMoviesById(String tmdbId) {
        return ImmutableMap.of(
                Language.EN, TmdbApiUtils.getMovieById(tmdbId, Language.EN),
                Language.RU, TmdbApiUtils.getMovieById(tmdbId, Language.RU)
        );
    }

    /**
     * Get TmdbMovie from id by sending url to api
     *
     * @param id       tmdb id
     * @param language json language
     * @return Optional of TmdbMovie
     */
    private static Optional<TmdbResult.TmdbMovie> getMovieById(String id, Language language) {
        TmdbResult.TmdbMovie foundMovie = null;
        Optional<URL> url = getUrlById(id, language.getLanguageCode(tmdbApiConfig));
        if (url.isPresent()) {
            log.debug("{} | {}", id, url.get());
            foundMovie = TmdbResult.convertGenres(TmdbApiUtils.getMovie(url.get().toString()));
        }

        return Optional.ofNullable(foundMovie);
    }

    /**
     * Create request api url from movie file object (name and year)
     * sample url: https://api.themoviedb.org/3/search/movie?api_key=33ca5cbc&query=Aladdin&primary_release_year=2019&language=en-US
     *
     * @param movieFileTo movie file object
     * @param language    language of results
     * @return Optional of URL object
     */
    private static Optional<URL> getUrlByNameAndYear(MovieFileTo movieFileTo, String language) {
        URL url = null;
        try {
            URIBuilder uri = new URIBuilder(tmdbApiConfig.getEndpoint().getSearch());
            uri.addParameter(tmdbApiConfig.getName().getTitle(), movieFileTo.getNameDbStyled());
            uri.addParameter(tmdbApiConfig.getName().getYear(), String.valueOf(movieFileTo.getYear()));
            uri.addParameter(tmdbApiConfig.getName().getLanguage(), language);
            uri.addParameter(tmdbApiConfig.getName().getApikey(), tmdbApiConfig.getValue().getApikey());
            url = uri.build().toURL();
        } catch (URISyntaxException e) {
            log.error("wrong uri syntax {}", tmdbApiConfig.getEndpoint().getSearch(), e);
        } catch (MalformedURLException e) {
            log.error("malformed url {}", movieFileTo, e);
        } catch (Exception e) {
            log.error("error creating url for {}", movieFileTo.toString(), e);
        }

        return Optional.ofNullable(url);
    }

    /**
     * Create request api url from tmdb id
     * sample url: https://api.themoviedb.org/3/movie/9487?api_key=33ca5cbc&language=en-US
     *
     * @param id       tmdb id
     * @param language language of results
     * @return Optional of url for api-request by id
     */
    private static Optional<URL> getUrlById(String id, String language) {
        URL url = null;
        try {
            URIBuilder uri = new URIBuilder(String.format("%s/%s", tmdbApiConfig.getEndpoint().getMovie(), id));
            uri.addParameter(tmdbApiConfig.getName().getLanguage(), language);
            uri.addParameter(tmdbApiConfig.getName().getApikey(), tmdbApiConfig.getValue().getApikey());
            url = uri.build().toURL();
        } catch (URISyntaxException e) {
            log.error("wrong uri syntax {}", tmdbApiConfig.getEndpoint().getSearch(), e);
        } catch (MalformedURLException e) {
            log.error("malformed url for id: {}", id, e);
        } catch (Exception e) {
            log.error("error creating url for id: {}", id, e);
        }

        return Optional.ofNullable(url);
    }

    /**
     * Sends request to tmdb-api, gets json object and maps it on java class
     *
     * @param url url to required movie
     * @return TmdbResult or null if nothing's found
     */
    private static TmdbResult getMoviesResult(String url) {
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
    private static TmdbResult.TmdbMovie getMovie(String url) {
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
     * Sends the given request using this client
     * http://zetcode.com/java/getpostrequest/
     *
     * @param url api url
     * @return the response
     * @throws IOException          if an I/O error occurs when sending or receiving
     * @throws InterruptedException if the operation is interrupted
     */
    private static HttpResponse<String> sendRequest(String url) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        return client.send(request, HttpResponse.BodyHandlers.ofString());
    }
}
