package com.blaec.movielibrary.model;

import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.time.LocalDate;
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

    @Column(name="tmdb_id")
    @NonNull private String tmdbId;
    @NonNull private String title;

    @Column(name="release_date")
    @NonNull private String releaseDate;

    @Column(name="poster_path")
    @NonNull private String posterPath;

    @Column(name="poster_path_ru")
    @NonNull private String posterPathRu;

    // see following annotations:
    // @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "role"}, name = "user_roles_unique")})
    // @Column(name = "role")
    // @ElementCollection(fetch = FetchType.EAGER)
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


    private static Movie fromTmdb(MovieTmdbTo tmdbMovie) {
        Movie movie = new Movie();
        movie.tmdbId = tmdbMovie.getTmdbId();
        movie.title = tmdbMovie.getTitle();
        movie.releaseDate = tmdbMovie.getReleaseDate();
        movie.posterPath = tmdbMovie.getPosterPath();
        movie.posterPathRu = tmdbMovie.getPosterPathRu();
        movie.genres = tmdbMovie.getGenres();

        return movie;
    }

    public static Movie createWithWishlistType(MovieTmdbTo tmdbMovie) {
        Movie movie = fromTmdb(tmdbMovie);
        movie.type = Type.wish_list;

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

        return movie;
    }

    @Override
    public String toString() {
        return String.format("#%s %s (%s) %.1fGb", tmdbId, title, releaseDate, size);
    }
}
