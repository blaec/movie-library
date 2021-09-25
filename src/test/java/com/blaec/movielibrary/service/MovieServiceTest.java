//package com.blaec.movielibrary.service;
//
//import com.blaec.movielibrary.MovieTestData;
//import com.blaec.movielibrary.model.Movie;
//import com.blaec.movielibrary.repository.MovieRepository;
//import com.blaec.movielibrary.services.MovieService;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.Test;
//
//import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
//
//@Slf4j
//@AllArgsConstructor
//public class MovieServiceTest {
//    private MovieRepository repository;
//    protected MovieService service;
//
//    @Test
//    void getAll() throws Exception {
//        Iterable<Movie> movies = service.getAll();
//        assertThat(MovieTestData.MOVIE_1).isEqualTo(movies);
//    }
//}
