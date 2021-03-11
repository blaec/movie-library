package com.blaec.movielibrary.repository;

import com.blaec.movielibrary.enums.Type;
import com.blaec.movielibrary.model.Movie;
import org.springframework.data.repository.CrudRepository;

public interface MovieRepository extends CrudRepository<Movie, Integer> {
//    Movie findByImdbId(String imdbId);

    Iterable<Movie> findAllByType(Type type);
}
