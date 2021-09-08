package com.blaec.movielibrary.api.implementations;

import com.blaec.movielibrary.api.MovieDataBaseApi;
import com.blaec.movielibrary.configs.TmdbApiConfig;
import com.blaec.movielibrary.enums.Language;
import com.blaec.movielibrary.model.json.TmdbResult;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@Slf4j
@Component
@AllArgsConstructor
public class TmdbApiImpl implements MovieDataBaseApi {
    private final TmdbApiConfig tmdbApiConfig;

    private static final Gson gson = new Gson();


    @Override
    public Optional<MovieTmdbTo> getMovieByNameAndYear(MovieFileTo movieFile) {
        ImmutableMap<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies = ImmutableMap.of(
                Language.EN, getMovieByNameAndYear(movieFile, Language.EN),
                Language.RU, getMovieByNameAndYear(movieFile, Language.RU)
        );

        return MovieTmdbTo.fromJson(jsonMovies);
    }

    private Optional<TmdbResult.TmdbMovie> getMovieByNameAndYear(MovieFileTo movieFileTo, Language language) {
        TmdbResult.TmdbMovie foundMovie = null;
        Optional<URI> uri = getUrlByNameAndYear(movieFileTo, language.getLanguageCode(tmdbApiConfig));
        if (uri.isPresent()) {
            log.debug("{} | {}", movieFileTo.toString(), uri.get());
            foundMovie = getMoviesResult(uri.get())
                    .flatMap(tmdbResult -> tmdbResult.getResults().stream().findFirst())
                    .orElse(null);
        }

        return Optional.ofNullable(foundMovie);
    }

    /**
     * Create request api url from movie file object (name and year)
     * sample url: https://api.themoviedb.org/3/search/movie?api_key=33ca5cbc&query=Aladdin&primary_release_year=2019&language=en-US
     */
    private Optional<URI> getUrlByNameAndYear(MovieFileTo movieFileTo, String language) {
        URI uri = null;
        try {
            URIBuilder uriBuilder = new URIBuilder(tmdbApiConfig.getEndpoint().getSearch());
            TmdbApiConfig.Name name = tmdbApiConfig.getName();
            uriBuilder.addParameter(name.getTitle(), movieFileTo.getNameDbStyled());
            uriBuilder.addParameter(name.getYear(), String.valueOf(movieFileTo.getYear()));
            uriBuilder.addParameter(name.getLanguage(), language);
            uriBuilder.addParameter(name.getApikey(), tmdbApiConfig.getValue().getApikey());
            uri = uriBuilder.build();
        } catch (URISyntaxException e) {
            log.error("wrong uri syntax {}", tmdbApiConfig.getEndpoint().getSearch(), e);
        } catch (Exception e) {
            log.error("error creating url for {}", movieFileTo.toString(), e);
        }

        return Optional.ofNullable(uri);
    }

    /**
     * Sends request to tmdb-api, gets json object and maps it on java class
     */
    private Optional<TmdbResult> getMoviesResult(URI uri) {
        TmdbResult movieJson = null;
        try {
            HttpResponse<String> stringHttpResponse = sendRequest(uri);
            movieJson = gson.fromJson(stringHttpResponse.body(), TmdbResult.class);
        } catch (IOException | InterruptedException e) {
            log.error("Failed to get tmdb movie data from url {}", uri);
        }

        return Optional.ofNullable(movieJson);
    }

    /**
     * Sends the given request using this client
     * http://zetcode.com/java/getpostrequest/
     */
    private HttpResponse<String> sendRequest(URI uri) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .build();

        return client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Override
    public Optional<MovieTmdbTo> getMovieById(TmdbResult.TmdbMovie tmdbMovie) {
        return getMovieById(tmdbMovie.getId());
    }

    @Override
    public Optional<MovieTmdbTo> getMovieById(String tmdbId) {
        ImmutableMap<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies = ImmutableMap.of(
                Language.EN, getMovieById(tmdbId, Language.EN),
                Language.RU, getMovieById(tmdbId, Language.RU)
        );

        return MovieTmdbTo.fromJson(jsonMovies);
    }

    private Optional<TmdbResult.TmdbMovie> getMovieById(String id, Language language) {
        TmdbResult.TmdbMovie foundMovie = null;
        Optional<URI> uri = getUrlById(id, language.getLanguageCode(tmdbApiConfig));
        if (uri.isPresent()) {
            log.debug("{} | {}", id, uri);
            foundMovie = getMovie(uri.get())
                    .map(TmdbResult::convertGenres)
                    .orElse(null);
        }

        return Optional.ofNullable(foundMovie);
    }

    /**
     * Create request api url from tmdb id
     * sample url: https://api.themoviedb.org/3/movie/9487?api_key=33ca5cbc&language=en-US
     */
    private Optional<URI> getUrlById(String id, String language) {
        URI uri = null;
        try {
            URIBuilder uriBuilder = new URIBuilder(String.format("%s/%s", tmdbApiConfig.getEndpoint().getMovie(), id));
            uriBuilder.addParameter(tmdbApiConfig.getName().getLanguage(), language);
            uriBuilder.addParameter(tmdbApiConfig.getName().getApikey(), tmdbApiConfig.getValue().getApikey());
            uri = uriBuilder.build();
        } catch (URISyntaxException e) {
            log.error("wrong uri syntax {}", tmdbApiConfig.getEndpoint().getSearch(), e);
        } catch (Exception e) {
            log.error("error creating url for id: {}", id, e);
        }

        return Optional.ofNullable(uri);
    }

    private Optional<TmdbResult.TmdbMovie> getMovie(URI uri) {
        TmdbResult.TmdbMovie movieJson = null;
        try {
            HttpResponse<String> stringHttpResponse = sendRequest(uri);
            movieJson = gson.fromJson(stringHttpResponse.body(), TmdbResult.TmdbMovie.class);
        } catch (IOException | InterruptedException e) {
            log.error("Failed to get imdb movie data from url {}", uri);
        }

        return Optional.ofNullable(movieJson);
    }
}
