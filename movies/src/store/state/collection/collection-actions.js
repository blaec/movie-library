import axios from "../../../axios-movies";
import {getDeleteUrl, getNowPlayingUrl, getAnticipatedUrl, movieApi} from "../../../utils/UrlUtils";
import {collectionActions} from "./collection-slice";
import {feedbackActions} from "../feedback/feedback-slice";
import {uploadActions} from "../upload/upload-slice";

export const fetchMovies = () => {
    return async (dispatch) => {
        axios.get(movieApi.get.getAllMovies)
            .then(response => {
                const {data} = response;
                console.log("fetchMovies");
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
                const result = {data: data, hasResult: true};
                dispatch(collectionActions.setFilteredMovies(result));
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

export const deleteMovie = (tmdbId) => {
    return async (dispatch) => {
        axios.delete(getDeleteUrl(tmdbId))
            .then(response => {
                const {data} = response;
                dispatch(uploadActions.setResult(data));
                console.log("fetchMovies from deleteMovie");
                dispatch(fetchMovies());
                dispatch(fetchWishlist());
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to deleted movie with tmdbId '${tmdbId}'`,
                    type: 'error'
                }));
            });
    };
};

export const fetchNowPlaying = (tmdbApi) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getNowPlayingUrl(tmdbApi), "setNowPlaying", "Failed getting now playing movies");
    }
};

export const fetchAnticipated = (tmdbApi) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getAnticipatedUrl(tmdbApi), "setAnticipated", "Failed getting anticipated movies");
    }
};

const fetchByPage = (dispatch, url, fetchType, errMessage) => {
    axios.get(url)
        .then(response => {
            const {data: {results}} = response;
            const movies = results.map(movie => {
                const {id, poster_path, title, release_date} = movie;
                return {
                    id: id + new Date().getTime(),
                    tmdbId: id,
                    posterPath: poster_path,
                    title,
                    releaseDate: release_date
                };
            });
            dispatch(collectionActions[fetchType](movies));
        })
        .catch(error => {
            console.log(error);
            dispatch(feedbackActions.setSnackbar({
                message: `${error} | ${errMessage}`,
                type: 'error'
            }));
        });
};

export const fetchLibrary = () => {
    return async (dispatch) => {
        axios.get(movieApi.get.getAll)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setLibrary(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load entire library`,
                    type: 'error'
                }));
            });
    };
};
