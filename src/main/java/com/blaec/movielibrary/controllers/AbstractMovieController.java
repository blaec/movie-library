package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.api.MovieDataBaseApi;
import com.blaec.movielibrary.configs.UploadConfigs;
import com.blaec.movielibrary.model.Movie;
import com.blaec.movielibrary.model.json.SingleFileUpload;
import com.blaec.movielibrary.model.object.Response;
import com.blaec.movielibrary.model.to.MovieFileTo;
import com.blaec.movielibrary.model.to.MovieTmdbTo;
import com.blaec.movielibrary.services.MovieService;
import com.blaec.movielibrary.utils.FilesUtils;
import com.blaec.movielibrary.utils.MovieUtils;
import com.google.common.collect.ImmutableList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Slf4j
public abstract class AbstractMovieController extends AbstractController{
    @Autowired protected UploadConfigs uploadConfigs;
    @Autowired protected MovieService movieService;
    @Autowired protected MovieDataBaseApi tmdbApi;

    protected List<String> locations;

    @PostConstruct
    public void init () {
        locations = ImmutableList.of(
                uploadConfigs.getCartoons(),
                uploadConfigs.getMovies(),
                uploadConfigs.getSerialMovies(),
                uploadConfigs.getMusic(),
                uploadConfigs.getVideos()
        );
    }

    protected Response.Builder trySaveToWishlist(Optional<MovieTmdbTo> tmdbMovie) {
        Callable<Response.Builder> onSave = () -> movieService.saveToWishlist(tmdbMovie);
        return trySave(onSave, getTitle(tmdbMovie));
    }

    protected Response.Builder trySaveToCollection(Optional<MovieTmdbTo> tmdbMovie, MovieFileTo movieFile) {
        Callable<Response.Builder> onSave = () -> movieService.saveToCollection(tmdbMovie, movieFile);
        return trySave(onSave, getTitle(tmdbMovie));
    }

    private String getTitle(Optional<MovieTmdbTo> tmdbMovie) {
        return tmdbMovie.isPresent()
                ? tmdbMovie.get().getTitle()
                : "";
    }

    private Response.Builder trySave(Callable<Response.Builder> onSave, String title) {
        try {
            return onSave.call();
        } catch (Exception e) {
            return Response.Builder.create()
                    .setTitle(title)
                    .setFailMessage("rollback after database failure");
        }
    }

    protected List<MovieFileTo> getMoviesFromFolder(String folder) {
        return FilesUtils.getMoviesFromFolder(MovieUtils.getLocation(folder, uploadConfigs));
    }

    protected boolean isNewMovie(Iterable<Movie> dbMovies, MovieFileTo movieFile) {
        return MovieUtils.isMovieSaved(movieFile.getFileName(), dbMovies).isEmpty();
    }

    protected List<Response> countExistingMovies(List<MovieFileTo> folderMovies, List<MovieFileTo> newMovies) {
        return folderMovies.stream()
                .filter(fm -> !newMovies.contains(fm))
                .map(fm -> Response.Builder.create().setFailMessage("Already exist").build())
                .collect(Collectors.toList());
    }

    protected Predicate<MovieFileTo> isFileNameMatchRequested(SingleFileUpload uploadMovie) {
        return movieFile -> movieFile.getFileName().equals(uploadMovie.getFileName());
    }
}
