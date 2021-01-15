package com.blaec.movielibrary.model;

import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.to.MovieFileTo;
import com.blaec.movielibrary.to.MovieJsonTo;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;

@Slf4j
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "movies")
public class Movie{

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id private Integer id;

    @Column(name="imdb_id")
    @NonNull private String imdbId;
    @NonNull private String title;
    @NonNull private int year;
    @NonNull private String rated;
    @NonNull private int runtime;
    @NonNull private String genre;
    @NonNull private String actors;
    @NonNull private String language;
    @NonNull private String awards;

    @Column(name="imdb_rating")
    @NonNull private double imdbRating;

    @NonNull private String poster;

    @Column(name="imdb_votes")
    @NonNull private int imdbVotes;

    @Enumerated(EnumType.STRING)
    @NonNull private Type type;

    private Timestamp updated = new Timestamp(System.currentTimeMillis());

    @Enumerated(EnumType.STRING)
    private Resolution resolution;

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
    public static Movie from(MovieJsonTo movieJsonTo) {
        Movie movie = fromJson(movieJsonTo);
        movie.setType(Type.wish_list);

        return movie;
    }

    /**
     * Creates Movie object from Movie Json Object and Movie File object
     *
     * @param movieJsonTo movie json object
     * @param movieFileTo movie file object
     * @return Movie object with time <b>movie</b>
     */
    public static Movie of(MovieJsonTo movieJsonTo, MovieFileTo movieFileTo) {
        Movie movie = fromJson(movieJsonTo);
        movie.setType(Type.movie);

        // add movie file object
        movie.setResolution(movieFileTo.getResolution());
        movie.setSize(movieFileTo.getSize());
        movie.setLocation(movieFileTo.getLocation());
        movie.setDescription(movieFileTo.getDescription());
        movie.setFrameRate(movieFileTo.getFrameRate());

        return movie;
    }

    /**
     * Creates Movie object based on properties in Movie Json Object
     *
     * @param movieJsonTo movie json object
     * @return partial Movie object
     */
    private static Movie fromJson(MovieJsonTo movieJsonTo) {
        Movie movie = new Movie();

        // add movie json object
        movie.setImdbId(movieJsonTo.getImdbID());
        movie.setTitle(movieJsonTo.getTitle());
        movie.setYear(Integer.parseInt(movieJsonTo.getYear()));
        movie.setRated(movieJsonTo.getRated());
        movie.setRuntime(parseRuntime(movieJsonTo));
        movie.setGenre(movieJsonTo.getGenre());
        movie.setActors(movieJsonTo.getActors());
        movie.setLanguage(movieJsonTo.getLanguage());
        movie.setAwards(movieJsonTo.getAwards());
        movie.setImdbRating(parseImdbRating(movieJsonTo));
        movie.setPoster(extractPoster(movieJsonTo));
        movie.setImdbVotes(parseImdbVotes(movieJsonTo));

        return movie;
    }

    /**
     * Return poster link and when it do not exist, replace with placeholder link
     *
     * @param movieJsonTo movie json object
     * @return link to poster
     */
    private static String extractPoster(MovieJsonTo movieJsonTo) {
        String poster = movieJsonTo.getPoster();
        return "N/A".equals(poster)
                ? String.format("https://via.placeholder.com/200x300.png?text=%s", URLEncoder.encode(movieJsonTo.getTitle(), StandardCharsets.UTF_8))
                : poster;
    }

    /**
     * Parse imdb rating and if no data exist, return 0
     *
     * @param movieJsonTo movie json object
     * @return imdb rating
     */
    private static Double parseImdbRating(MovieJsonTo movieJsonTo) {
        String imdbRating = movieJsonTo.getImdbRating();
        return "N/A".equals(imdbRating)
                ? 0
                : Double.parseDouble(imdbRating);
    }

    /**
     * Remove comma from string and that parse it to integer; if no data exist, return 0
     *
     * @param movieJsonTo movie json object
     * @return imdb votes
     */
    private static int parseImdbVotes(MovieJsonTo movieJsonTo) {
        String imdbVotes = movieJsonTo.getImdbVotes();
        return "N/A".equals(imdbVotes)
                ? 0
                : Integer.parseInt(imdbVotes.replace(",", ""));
    }

    /**
     * Extracts runtime from movie json object, removes text and parses to integer; if no data exist, return 0
     *
     * @param movieJsonTo movie json object
     * @return runtime
     */
    private static int parseRuntime(MovieJsonTo movieJsonTo) {
        String runtime = movieJsonTo.getRuntime();
        return "N/A".equals(runtime)
                ? 0
                : Integer.parseInt(runtime.replace("min","").trim());
    }
}
