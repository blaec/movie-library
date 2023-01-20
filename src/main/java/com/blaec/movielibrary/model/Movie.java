package com.blaec.movielibrary.model;

import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
import com.blaec.movielibrary.utils.TestUtils;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Slf4j
@Entity
@Getter
@Setter(AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "movies")
// extends AbstractPersistable<Integer> - no need in id, hashCode, equals, etc...
public class Movie {

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id private Integer id;

    @Column(name="tmdb_id",
            unique=true,
            nullable = false,
            length = 15)
    @NonNull private String tmdbId;

    @Column(nullable = false,
            length = 100)
    @NonNull private String title;

    @Column(name="release_date",
            nullable = false,
            columnDefinition = "date")
    @NonNull private String releaseDate;

    @Column(name="poster_path",
            nullable = false)
    @NonNull private String posterPath;

    @Column(name="poster_path_ru",
            nullable = false)
    @NonNull private String posterPathRu;


    @Enumerated(EnumType.STRING)
    @NonNull private Type type;

    @Enumerated(EnumType.STRING)
    private Resolution resolution;

    @Column(name="file_name",
            length = 100)
    private String fileName;

    @Column(columnDefinition = "decimal(5,2)")
    private Double size = 0d;

    @Column(length = 100)
    private String location;

    @Column(length = 25)
    private String description;

    @Column(name="frame_rate")
    private Integer frameRate;

    @Column(name="creation_date",
            columnDefinition = "DATE DEFAULT (CURRENT_DATE)")
    @NonNull private LocalDate creationDate = LocalDate.now();

    // https://vladmihalcea.com/the-best-way-to-map-a-onetomany-association-with-jpa-and-hibernate/
    @OneToMany(mappedBy = "movie",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @NonNull private Set<Genre> genres;

    private static Movie fromTmdb(MovieTmdbTo tmdbMovie) {
        Movie movie = new Movie();
        movie.tmdbId = tmdbMovie.getTmdbId();
        movie.title = tmdbMovie.getTitle();
        movie.releaseDate = parseReleaseDate(tmdbMovie.getReleaseDate());
        movie.posterPath = String.valueOf(tmdbMovie.getPosterPath());
        movie.posterPathRu = String.valueOf(tmdbMovie.getPosterPathRu());
        movie.genres = tmdbMovie.getGenres();

        return movie;
    }

    /**
     * Since release date if mandatory, but could be unknown
     * empty value replaced with future date (10 years from now)
     *
     * @param releaseDate release date, could be empty string
     * @return Timestamp release date
     */
    private static String parseReleaseDate(String releaseDate) {
        return StringUtils.defaultIfEmpty(
                releaseDate,
                LocalDate.now().plus(10, ChronoUnit.YEARS).toString()
        );
    }

    public static Movie createWithWishlistType(MovieTmdbTo tmdbMovie) {
        Movie movie = fromTmdb(tmdbMovie);
        movie.type = Type.wish_list;
        movie.genres.forEach(movie::updateGenre);

        return movie;
    }

    public static Movie createWithMovieType(MovieTmdbTo tmdbMovie, MovieFileTo movieFileTo) {
        Movie movie = fromTmdb(tmdbMovie);
        movie.type = Type.movie;
        movie.resolution = movieFileTo.getResolution();
        movie.fileName = movieFileTo.getFileName();
        movie.size = movieFileTo.getSize();
        movie.location = movieFileTo.getLocation();
        movie.description = movieFileTo.getDescription();
        movie.frameRate = movieFileTo.getFrameRate();
        movie.genres.forEach(movie::updateGenre);

        return movie;
    }

    public void updateGenre(Genre genre) {
        genres.add(genre);
        genre.setMovie(this);
    }

    public Movie removeGenres() {
        genres.forEach(genre -> genre.setMovie(null));
        genres = new HashSet<>();

        return this;
    }

    public void updatePosters(String posterPath, String posterPathRu) {
        if (TestUtils.isJUnitTest()) {
            this.posterPath = posterPath;
            this.posterPathRu = posterPathRu;
        }
    }

    public String getLocationWithCleanFileName(List<String> locations) {
        String fullLocation = location;
        if (fullLocation.contains("actor -")) {
            fullLocation = "";
        } else {
            for (String location : locations) {
                fullLocation = fullLocation.replaceAll(location, "");
            }
            fullLocation = fullLocation.replaceAll("\\\\", "");
        }

        return String.format("%s%s", fullLocation, getCleanFileName());
    }

    private String getCleanFileName() {
        return Objects.requireNonNullElse(fileName, "")
                .replaceAll("The |A ", "");
    }

    @Override
    public String toString() {
        return String.format("#%s %s (%s) %.1fGb", tmdbId, title, releaseDate, size);
    }
}
