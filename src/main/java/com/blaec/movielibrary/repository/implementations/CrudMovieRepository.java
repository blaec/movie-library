package com.blaec.movielibrary.repository.implementations;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.Set;

public interface CrudMovieRepository extends CrudRepository<Movie, Integer> {
    Optional<Movie> findByTmdbId(String tmdbId);

    Iterable<Movie> findAllByType(Type type);

    @Query("SELECT DISTINCT m FROM Movie m JOIN m.genres g WHERE g.genreId IN (:genres) AND m.type='movie'")
    Iterable<Movie> findAllByGenreId(Set<Integer> genres);
}
