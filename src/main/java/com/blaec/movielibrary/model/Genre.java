package com.blaec.movielibrary.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter(AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "genres")
public class Genre {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id private Integer id;

    @Column(name="genre_id")
    @NonNull private Integer genreId;
}
