package com.blaec.movielibrary.model;

import com.blaec.movielibrary.enums.Language;
import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.TmdbResult;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Entity
@Getter
@Setter(AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "movies")
public class Movie{

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id private Integer id;

    @Column(name="tmdb_id")
    @NonNull private String tmdbId;
    @NonNull private String title;

    @Column(name="release_date")
    @NonNull private String releaseDate;

    @Column(name="poster_path")
    @NonNull private String posterPath;

    @Column(name="poster_path_ru")
    @NonNull private String posterPathRu;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @NonNull private Set<Genre> genres;

    @Enumerated(EnumType.STRING)
    @NonNull private Type type;

    @Enumerated(EnumType.STRING)
    private Resolution resolution;

    @Column(name="file_name")
    @NonNull private String fileName;
    private Double size = 0d;
    private String location;
    private String description;

    @Column(name="frame_rate")
    private Integer frameRate;

    @Column(name="creation_date")
    @NonNull private LocalDate creationDate = LocalDate.now();


    private static Movie fromJson(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies) {
        TmdbResult.TmdbMovie movieJsonTo = jsonMovies.get(Language.EN).get();
        TmdbResult.TmdbMovie movieJsonToRu = jsonMovies.get(Language.RU).get();

        Movie movie = new Movie();
        movie.tmdbId = movieJsonTo.getId();
        movie.title = movieJsonTo.getTitle();
        movie.releaseDate = movieJsonTo.getRelease_date();
        movie.posterPath = movieJsonTo.getPoster_path();
        movie.posterPathRu = movieJsonToRu.getPoster_path();
        movie.genres = convertGenreIds(movieJsonTo.getGenre_ids());

        return movie;
    }

    private static Set<Genre> convertGenreIds(List<Integer> genres) {
        return genres.stream()
                .map(genreId -> new Genre(null, genreId))
                .collect(Collectors.toSet());
    }

    public static Movie withWishlistTypeOf(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies) {
        Movie movie = fromJson(jsonMovies);
        movie.type = Type.wish_list;

        return movie;
    }

    public static Movie withMovieTypeOf(Map<Language, Optional<TmdbResult.TmdbMovie>> jsonMovies, MovieFileTo movieFileTo) {
        Movie movie = fromJson(jsonMovies);
        movie.type = Type.movie;
        movie.resolution = movieFileTo.getResolution();
        movie.fileName = movieFileTo.getFileName();
        movie.size = movieFileTo.getSize();
        movie.location = movieFileTo.getLocation();
        movie.description = movieFileTo.getDescription();
        movie.frameRate = movieFileTo.getFrameRate();

        return movie;
    }

    public Movie assignType(Type type) {
        this.type = type;
        return this;
    }

    // TODO currently not in use
    public void setConvertedGenres(List<TmdbResult.Genre> genres) {
        this.genres = extractGenres(genres);
    }

    private static Set<Genre> extractGenres(List<TmdbResult.Genre> genres) {
        return genres.stream()
                .map(genre -> new Genre(null, Integer.valueOf(genre.getId())))
                .collect(Collectors.toSet());
    }

    @Override
    public String toString() {
        return String.format("#%s %s (%s) %.1fGb", tmdbId, title, releaseDate, size);
    }
}
