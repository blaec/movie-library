package com.blaec.movielibrary.api;

import com.blaec.movielibrary.model.json.TmdbResult;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;

import java.util.Optional;

public interface MovieDataBaseApi {
    Optional<MovieTmdbTo> getMultilingualMoviesByNameAndYear(MovieFileTo movieFile);
    Optional<MovieTmdbTo> getMultilingualMoviesById(TmdbResult.TmdbMovie tmdbMovie);
    Optional<MovieTmdbTo> getMultilingualMoviesById(String tmdbId);
}
