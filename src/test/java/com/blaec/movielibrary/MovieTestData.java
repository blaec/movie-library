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
    public static final List<Integer> GENRE_IDS_4 = List.of(35, 28, 12, 878);
    public static final List<Integer> GENRE_IDS_5 = List.of(16, 10751, 35, 14);
    public static final List<Integer> GENRE_IDS_6 = List.of(14, 878, 28, 12);
    public static final List<TmdbResult.Genre> GENRES_1 = List.of(ACTION, CRIME, THRILLER);
    public static final List<TmdbResult.Genre> GENRES_2 = List.of(ACTION, ADVENTURE, FANTASY, SCIENCE_FICTION);
    public static final List<TmdbResult.Genre> GENRES_3 = List.of(ACTION, ADVENTURE, THRILLER);
    public static final List<TmdbResult.Genre> GENRES_4 = List.of(COMEDY, ACTION, ADVENTURE, SCIENCE_FICTION);
    public static final List<TmdbResult.Genre> GENRES_5 = List.of(ANIMATION, FAMILY, COMEDY, FANTASY);
    public static final List<TmdbResult.Genre> GENRES_6 = List.of(FANTASY, SCIENCE_FICTION, ACTION, ADVENTURE);


    public static final TmdbResult.TmdbMovie TMDB_MOVIE_1_EN = new TmdbResult.TmdbMovie("1", "2 Fast 2 Furious", "2003-06-03", "/poster-to-movie-1_en", GENRE_IDS_1, GENRES_1);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_2_EN = new TmdbResult.TmdbMovie("2", "Avatar", "2009-12-18", "/poster-to-movie-2_en", GENRE_IDS_2, GENRES_2);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_3_EN = new TmdbResult.TmdbMovie("3", "Commando", "1985-10-03", "/poster-to-movie-3_en", GENRE_IDS_3, GENRES_3);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_4_EN = new TmdbResult.TmdbMovie("4", "Free Guy", "2021-08-03", "/poster-to-movie-4_en", GENRE_IDS_4, GENRES_4);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_5_EN = new TmdbResult.TmdbMovie("5", "Wish Dragon", "2021-06-11", "/poster-to-movie-5_en", GENRE_IDS_5, GENRES_5);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_6_EN = new TmdbResult.TmdbMovie("6", "Eternals", "2021-11-05", "/poster-to-movie-6_en", GENRE_IDS_6, GENRES_6);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_1_RU = new TmdbResult.TmdbMovie("1", "2 Fast 2 Furious", "2003-06-03", "/poster-to-movie-1_ru", GENRE_IDS_1, GENRES_1);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_2_RU = new TmdbResult.TmdbMovie("2", "Avatar", "2009-12-18", "/poster-to-movie-2_ru", GENRE_IDS_2, GENRES_2);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_3_RU = new TmdbResult.TmdbMovie("3", "Commando", "1985-10-03", "/poster-to-movie-3_ru", GENRE_IDS_3, GENRES_3);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_4_RU = new TmdbResult.TmdbMovie("4", "Free Guy", "2021-08-03", "/poster-to-movie-4_ru", GENRE_IDS_4, GENRES_4);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_5_RU = new TmdbResult.TmdbMovie("5", "Wish Dragon", "2021-06-11", "/poster-to-movie-5_ru", GENRE_IDS_5, GENRES_5);
    public static final TmdbResult.TmdbMovie TMDB_MOVIE_6_RU = new TmdbResult.TmdbMovie("6", "Eternals", "2021-11-05", "/poster-to-movie-6_ru", GENRE_IDS_6, GENRES_6);

    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_1 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_1_EN), Language.RU, Optional.of(TMDB_MOVIE_1_RU));
    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_2 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_2_EN), Language.RU, Optional.of(TMDB_MOVIE_2_RU));
    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_3 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_3_EN), Language.RU, Optional.of(TMDB_MOVIE_3_RU));
    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_4 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_4_EN), Language.RU, Optional.of(TMDB_MOVIE_4_RU));
    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_5 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_5_EN), Language.RU, Optional.of(TMDB_MOVIE_5_RU));
    public static final Map<Language, Optional<TmdbResult.TmdbMovie>> JSONMOVIES_6 = ImmutableMap.of(Language.EN, Optional.of(TMDB_MOVIE_6_EN), Language.RU, Optional.of(TMDB_MOVIE_6_RU));

    public static final MovieTmdbTo MOVIE_TMDB_TO_1 = MovieTmdbTo.fromJson(JSONMOVIES_1).get();
    public static final MovieTmdbTo MOVIE_TMDB_TO_2 = MovieTmdbTo.fromJson(JSONMOVIES_2).get();
    public static final MovieTmdbTo MOVIE_TMDB_TO_3 = MovieTmdbTo.fromJson(JSONMOVIES_3).get();
    public static final MovieTmdbTo MOVIE_TMDB_TO_4 = MovieTmdbTo.fromJson(JSONMOVIES_4).get();
    public static final MovieTmdbTo MOVIE_TMDB_TO_5 = MovieTmdbTo.fromJson(JSONMOVIES_5).get();
    public static final MovieTmdbTo MOVIE_TMDB_TO_6 = MovieTmdbTo.fromJson(JSONMOVIES_6).get();

    public static final Movie WISH_MOVIE_1 = Movie.createWithWishlistType(MOVIE_TMDB_TO_4);
    public static final Movie WISH_MOVIE_2 = Movie.createWithWishlistType(MOVIE_TMDB_TO_5);
    public static final Movie WISH_MOVIE_3 = Movie.createWithWishlistType(MOVIE_TMDB_TO_6);
    public static final List<Movie> WISH_MOVIES = List.of(WISH_MOVIE_3, WISH_MOVIE_2, WISH_MOVIE_1);



    public static final File FILE_1 = new File("002. 2 Fast 2 Furious (2003) [1080p].mkv");
    public static final File FILE_2 = new File("Avatar [Extended Collector's Cut] (2009) [720p].mkv");
    public static final File FILE_3 = new File("Commando (1985) [1080p].mkv");

    public static final Movie MOVIE_1 = Movie.createWithMovieType(MOVIE_TMDB_TO_1, MovieFileTo.from(FILE_1).get());
    public static final Movie MOVIE_2 = Movie.createWithMovieType(MOVIE_TMDB_TO_2, MovieFileTo.from(FILE_2).get());
    public static final Movie MOVIE_3 = Movie.createWithMovieType(MOVIE_TMDB_TO_3, MovieFileTo.from(FILE_3).get());
    public static final List<Movie> MOVIES = List.of(MOVIE_3, MOVIE_2, MOVIE_1);


}
