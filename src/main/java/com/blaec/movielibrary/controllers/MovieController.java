package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.repository.MovieRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@AllArgsConstructor
@RequestMapping("/movies")
@CrossOrigin(origins = {"http://192.168.1.11:3000", "http://localhost:3000"})
@RestController
public class MovieController {
    private final MovieRepository movieRepository;

    @GetMapping
    public Iterable<Movie> getAll() {
        return sortByTitleAndYear(movieRepository.findAll());
    }

    /**
     * Sort movie list by title and than by release date, skip 'the' and 'a' in title
     *
     * @param movies list of movies to sort
     * @return sorted list
     */
    private Iterable<Movie> sortByTitleAndYear(Iterable<Movie> movies) {
        return StreamSupport.stream(movies.spliterator(), false).sorted(Comparator
                .comparing((Movie m) ->
                        m.getTitle().startsWith("The ")
                            ? m.getTitle().replace("The ", "")
                            : m.getTitle().startsWith("A ")
                                ? m.getTitle().replace("A ", "")
                                : m.getTitle())
                .thenComparing(Movie::getReleaseDate))
                .collect(Collectors.toList());
    }
}
