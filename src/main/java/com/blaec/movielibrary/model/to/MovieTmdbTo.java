package com.blaec.movielibrary.model.to;

import com.blaec.movielibrary.enums.Language;
import com.blaec.movielibrary.model.Genre;
import com.blaec.movielibrary.model.json.TmdbResult;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MovieTmdbTo {
    private String tmdbId;
    private String title;
    private String releaseDate;
    private String posterPath;
    private String posterPathRu;
    private Set<Genre> genres;

    public static Optional<MovieTmdbTo> fromJson(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies) {
        if (!isAllJsonMoviesPresent(jsonMovies)) {
            return Optional.empty();
        }

        TmdbResult.TmdbMovie movieJsonTo = jsonMovies.get(Language.EN).get();
        TmdbResult.TmdbMovie movieJsonToRu = jsonMovies.get(Language.RU).get();

        MovieTmdbTo movie = new MovieTmdbTo();
        movie.tmdbId = movieJsonTo.getId();
        movie.title = movieJsonTo.getTitle();
        movie.releaseDate = movieJsonTo.getRelease_date();
        movie.posterPath = movieJsonTo.getPoster_path();
        movie.posterPathRu = movieJsonToRu.getPoster_path();
        movie.genres = convertGenreIds(movieJsonTo.getGenre_ids());

        return Optional.of(movie);
    }

    private static boolean isAllJsonMoviesPresent(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies) {
        return jsonMovies.values().stream().allMatch(Optional::isPresent);
    }

    private static Set<Genre> convertGenreIds(List<Integer> genres) {
        return genres.stream()
                .map(genreId -> new Genre(null, genreId))
                .collect(Collectors.toSet());
    }
}
