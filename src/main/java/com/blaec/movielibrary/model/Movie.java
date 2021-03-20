package com.blaec.movielibrary.model;

import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.TmdbResult;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Entity
@Getter
@Setter
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
    @NonNull private String genres;

    @Enumerated(EnumType.STRING)
    @NonNull private Type type;

    @Enumerated(EnumType.STRING)
    private Resolution resolution;

    @Column(name="file_name")
    @NonNull private String fileName;
    private Double size;
    private String location;
    private String description;

    @Column(name="frame_rate")
    private Integer frameRate;

    /**
     * Creates Movie object from Movie Json Object
     *
     * @param movieJsonTo movie json object
     * @return Movie object with type <b>wish_list</b>
     */
    public static Movie from(TmdbResult.TmdbMovie movieJsonTo) {
        Movie movie = fromJson(movieJsonTo);
        movie.setType(Type.wish_list);

        return movie;
    }

    /**
     * Creates Movie object from Movie Json object and Movie File object
     *
     * @param movieJsonTo movie json object
     * @param movieFileTo movie file object
     * @return Movie object
     */
    public static Movie of(TmdbResult.TmdbMovie movieJsonTo, MovieFileTo movieFileTo) {
        Movie movie = fromJson(movieJsonTo);
        movie.setType(Type.movie);

        // add movie file object
        movie.setResolution(movieFileTo.getResolution());
        movie.setFileName(movieFileTo.getFileName());
        movie.setSize(movieFileTo.getSize());
        movie.setLocation(movieFileTo.getLocation());
        movie.setDescription(movieFileTo.getDescription());
        movie.setFrameRate(movieFileTo.getFrameRate());
        movie.setGenres(convertGenreIds(movieJsonTo.getGenre_ids()));

        return movie;
    }

    /**
     * Creates Movie object based on properties in Movie Json Object
     *
     * @param movieJsonTo movie json object
     * @return partial Movie object
     */
    public static Movie fromJson(TmdbResult.TmdbMovie movieJsonTo) {
        Movie movie = new Movie();

        // add movie json object
        movie.setTmdbId(movieJsonTo.getId());
        movie.setTitle(movieJsonTo.getTitle());
        movie.setReleaseDate(movieJsonTo.getRelease_date());
        movie.setPosterPath(movieJsonTo.getPoster_path());
        movie.setGenres(convertGenreIds(movieJsonTo.getGenre_ids()));

        return movie;
    }

    public void setConvertedGenreIds(List<Integer> genres) {
        this.genres = convertGenreIds(genres);
    }

    public void setConvertedGenres(List<TmdbResult.Genre> genres) {
        this.genres = convertGenres(genres);
    }

    private static String convertGenreIds(List<Integer> genres) {
        return genres.stream()
                .map(Object::toString)
                .collect(Collectors.joining(","));
    }

    private static String convertGenres(List<TmdbResult.Genre> genres) {
        return genres.stream()
                .map(TmdbResult.Genre::getId)
                .collect(Collectors.joining(","));
    }

    @Override
    public String toString() {
        return String.format("#%s %s (%s) %.1fGb", tmdbId, title, releaseDate, size);
    }
}
