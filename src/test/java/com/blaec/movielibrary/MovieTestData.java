package com.blaec.movielibrary;

import com.blaec.movielibrary.enums.Language;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.json.TmdbResult;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
import com.google.common.collect.ImmutableMap;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class MovieTestData {
    public static final String[] IGNORED_FIELDS = {
            "id",
            "releaseDate",
            "posterPath",
            "posterPathRu",
            "genres",
            "size",
            "location",
            "creationDate"
    };

    public static final TmdbResult.Genre ACTION = new TmdbResult.Genre("28", "Action");
    public static final TmdbResult.Genre ADVENTURE = new TmdbResult.Genre("12", "Adventure");
    public static final TmdbResult.Genre ANIMATION = new TmdbResult.Genre("16", "Animation");
    public static final TmdbResult.Genre COMEDY = new TmdbResult.Genre("35", "Comedy");
    public static final TmdbResult.Genre CRIME = new TmdbResult.Genre("80", "Crime");
    public static final TmdbResult.Genre DRAMA = new TmdbResult.Genre("18", "Drama");
    public static final TmdbResult.Genre FANTASY = new TmdbResult.Genre("14", "Fantasy");
    public static final TmdbResult.Genre FAMILY = new TmdbResult.Genre("10751", "Family");
    public static final TmdbResult.Genre SCIENCE_FICTION = new TmdbResult.Genre("878", "Science Fiction");
    public static final TmdbResult.Genre THRILLER = new TmdbResult.Genre("53", "Thriller");
    public static final List<Integer> GENRE_IDS_1 = List.of(28, 80, 53);
    public static final List<Integer> GENRE_IDS_2 = List.of(28, 12, 14, 878);
    public static final List<Integer> GENRE_IDS_3 = List.of(28, 12, 53);
    public static final List<Integer> GENRE_IDS_WISH = List.of(80, 53);
    public static final List<TmdbResult.Genre> GENRES_1 = List.of(ACTION, CRIME, THRILLER);
    public static final List<TmdbResult.Genre> GENRES_2 = List.of(ACTION, ADVENTURE, FANTASY, SCIENCE_FICTION);
    public static final List<TmdbResult.Genre> GENRES_3 = List.of(ACTION, ADVENTURE, THRILLER);
    public static final List<TmdbResult.Genre> GENRES_WISH = List.of(CRIME, THRILLER);


    public static final TmdbResult.TmdbMovie TMDB_MOVIE_1_EN = new TmdbResult.TmdbMovie("584", "2 Fast 2 Furious", "2003-06-03", "/poster-to-movie-1_en", GENRE_IDS_1, GENRES_1);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_2_EN = new TmdbResult.TmdbMovie("19995", "Avatar", "2009-12-18", "/poster-to-movie-2_en", GENRE_IDS_2, GENRES_2);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_3_EN = new TmdbResult.TmdbMovie("10999", "Commando", "1985-10-03", "/poster-to-movie-3_en", GENRE_IDS_3, GENRES_3);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_1_RU = new TmdbResult.TmdbMovie("584", "2 Fast 2 Furious", "2003-06-03", "/poster-to-movie-1_ru", GENRE_IDS_1, GENRES_1);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_2_RU = new TmdbResult.TmdbMovie("19995", "Avatar", "2009-12-18", "/poster-to-movie-2_ru", GENRE_IDS_2, GENRES_2);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_3_RU = new TmdbResult.TmdbMovie("10999", "Commando", "1985-10-03", "/poster-to-movie-3_ru", GENRE_IDS_3, GENRES_3);
    public static final TmdbResult.TmdbMovie TMDB_WISH_MOVIE = new TmdbResult.TmdbMovie("637534", "The Stronghold", "2021-08-18", "/nLanxl7Xhfbd5s8FxPy8jWZw4rv.jpg", GENRE_IDS_WISH, GENRES_WISH);

    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_1 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_1_EN), Language.RU, Optional.of(TMDB_MOVIE_1_RU));
    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_2 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_2_EN), Language.RU, Optional.of(TMDB_MOVIE_2_RU));
    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_3 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_3_EN), Language.RU, Optional.of(TMDB_MOVIE_3_RU));

    public static final MovieTmdbTo MOVIE_TMDB_TO_1 = MovieTmdbTo.fromJson(JSONMOVIES_1).get();
    public static final MovieTmdbTo MOVIE_TMDB_TO_2 = MovieTmdbTo.fromJson(JSONMOVIES_2).get();
    public static final MovieTmdbTo MOVIE_TMDB_TO_3 = MovieTmdbTo.fromJson(JSONMOVIES_3).get();

    public static final File FILE_1 = new File("002. 2 Fast 2 Furious (2003) [1080p].mkv");
    public static final File FILE_2 = new File("Avatar [Extended Collector's Cut] (2009) [720p].mkv");
    public static final File FILE_3 = new File("Commando (1985) [1080p].mkv");

    public static final Movie MOVIE_1 = Movie.createWithMovieType(MOVIE_TMDB_TO_1, MovieFileTo.from(FILE_1).get());
    public static final Movie MOVIE_2 = Movie.createWithMovieType(MOVIE_TMDB_TO_2, MovieFileTo.from(FILE_2).get());
    public static final Movie MOVIE_3 = Movie.createWithMovieType(MOVIE_TMDB_TO_3, MovieFileTo.from(FILE_3).get());
    public static final List<Movie> MOVIES = List.of(MOVIE_3, MOVIE_2, MOVIE_1);
}
