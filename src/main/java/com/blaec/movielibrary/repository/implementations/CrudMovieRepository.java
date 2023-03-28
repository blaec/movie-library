package com.blaec.movielibrary.repository.implementations;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

public interface CrudMovieRepository extends CrudRepository<Movie, Integer> {
    Optional<Movie> findByTmdbId(String tmdbId);

    Iterable<Movie> findAllByType(Type type);

    @Query("SELECT DISTINCT m FROM Movie m JOIN m.genres g WHERE g.genreId IN (:genres) AND m.type='movie'")
//    @Query(value = "SELECT m.* FROM movies m WHERE EXISTS (SELECT 1 FROM genres g WHERE g.genre_id IN (:genres) AND m.id = g.movie_id) AND m.type='movie';",
//            nativeQuery = true)
    Iterable<Movie> findAllWithGenres(Set<Integer> genres);

    @Query(value = "SELECT m.* FROM movies m " +
            "WHERE NOT EXISTS (SELECT 1 FROM genres g WHERE g.genre_id IN (:genres) AND m.id = g.movie_id) " +
            "  AND m.type='movie';",
            nativeQuery = true)
    Iterable<Movie> findAllWithoutGenres(Set<Integer> genres);

    @Query(value = "SELECT m.* FROM movies m " +
            "WHERE EXISTS (SELECT 1 FROM genres g WHERE g.genre_id IN (:includeGenres) AND m.id = g.movie_id) " +
            "  AND NOT EXISTS (SELECT 1 FROM genres g WHERE g.genre_id IN (:excludeGenres) AND m.id = g.movie_id) " +
            "  AND m.type='movie'",
            nativeQuery = true)
    Iterable<Movie> findAllFilteringByGenres(Set<Integer> includeGenres, Set<Integer> excludeGenres);

    @Transactional
    @Modifying
    @Query("DELETE FROM Movie m WHERE m.id=:id")
    int delete(int id);
}
