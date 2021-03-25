package com.blaec.movielibrary.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "movie_genres")
public class Genre {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id private Integer id;

    @Column(name="tmdb_id")
    @NonNull
    private String tmdbId;

    @Column(name="genre_id")
    @NonNull
    private Integer genreId;
}
