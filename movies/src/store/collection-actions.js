import axios from "../axios-movies";
import {getDeleteUrl, getNowPlayingUrl, getUpcomingUrl, movieApi} from "../utils/UrlUtils";
import {collectionActions} from "./collection-slice";
import {feedbackActions} from "./feedback-slice";
import {uploadActions} from "./upload-slice";

export const fetchMovies = () => {
    return async (dispatch) => {
        axios.get(movieApi.get.getAllMovies)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setMoviesCollection(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load movies`,
                    type: 'error'
                }));
            });
    };
};

export const fetchWishlist = () => {
    return async (dispatch) => {
        axios.get(movieApi.get.getAllWishMovies)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setWishlistCollection(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load wishlist`,
                    type: 'error'
                }));
            });
    };
};

export const fetchFilteredCollection = (genreIds) => {
    return async (dispatch) => {
        axios.post(movieApi.get.getAllByGenres, genreIds.split(","))
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setFilteredMovies(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load filtered movie list`,
                    type: 'error'
                }));
            });
    };
};

export const deleteMovie = (id) => {
    return async (dispatch) => {
        axios.delete(getDeleteUrl(id))
            .then(response => {
                const {data} = response;
                dispatch(uploadActions.setResult(data));
                dispatch(fetchMovies());
                dispatch(fetchWishlist());
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to deleted movie with id '${id}'`,
                    type: 'error'
                }));
            });
    };
};

export const fetchNowPlaying = (tmdbApi) => {
    return async (dispatch) => {
        axios.get(getNowPlayingUrl(tmdbApi))
            .then(response => {
                const {data: {results}} = response;
                const nowPlayingMovies = results.map(movie => {
                    const {id, poster_path, title, release_date} = movie;
                    return {
                        id: id + new Date().getTime(),
                        tmdbId: id,
                        posterPath: poster_path,
                        title,
                        releaseDate: release_date
                    };
                });
                dispatch(collectionActions.setNowPlaying(nowPlayingMovies));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to now playing movies`,
                    type: 'error'
                }));
            });
    };
};

export const fetchUpcoming = (tmdbApi) => {
    return async (dispatch) => {
        axios.get(getUpcomingUrl(tmdbApi))
            .then(response => {
                const {data: {results}} = response;
                const upcoming = results.map(movie => {
                    const {id, poster_path, title, release_date} = movie;
                    return {
                        id: id + new Date().getTime(),
                        tmdbId: id,
                        posterPath: poster_path,
                        title,
                        releaseDate: release_date
                    };
                });
                dispatch(collectionActions.setUpcoming(upcoming));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to now playing movies`,
                    type: 'error'
                }));
            });
    };
};
