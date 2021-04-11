package com.blaec.movielibrary.repository;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface MovieRepository extends CrudRepository<Movie, Integer> {
//    Movie findByImdbId(String imdbId);

    Iterable<Movie> findAllByType(Type type);

    @Query("SELECT DISTINCT m FROM Movie m JOIN m.genres g WHERE g.genreId IN (:genres) AND m.type='movie'")
    Iterable<Movie> findAllByGenreId(Set<Integer> genres);
}
