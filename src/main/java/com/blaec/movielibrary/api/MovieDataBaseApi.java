package com.blaec.movielibrary.api;

import com.blaec.movielibrary.model.json.TmdbResult;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;

import java.util.Optional;

public interface MovieDataBaseApi {
    Optional<MovieTmdbTo> getMovieByNameAndYear(MovieFileTo movieFile);
    Optional<MovieTmdbTo> getMovieById(TmdbResult.TmdbMovie tmdbMovie);
    Optional<MovieTmdbTo> getMovieById(String tmdbId);
}
