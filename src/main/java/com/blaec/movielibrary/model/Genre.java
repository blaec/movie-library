package com.blaec.movielibrary.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter(AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "genres")
public class Genre {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id private Integer id;

    @Column(name="genre_id")
    @NonNull private Integer genreId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Movie movie;

    public Genre(Integer id, @NonNull Integer genreId) {
        this.id = id;
        this.genreId = genreId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Genre genre = (Genre) o;
        return id != null && Objects.equals(id, genre.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
