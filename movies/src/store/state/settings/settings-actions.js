import axios from "../../../axios-movies";
import {getSearchMovieUrl, movieApi} from "../../../utils/UrlUtils";
import {settingsActions} from "./settings-slice";
import {feedbackActions} from "../feedback/feedback-slice";
import {fetchMovies, fetchWishlist} from "../collection/collection-actions";
import * as UrlUtils from "../../../utils/UrlUtils";
import {Loader} from "../../../utils/Constants";

export const fetchWishMovies = (params) => {
    return async (dispatch) => {
        dispatch(settingsActions.setLoader(Loader.wishMovie));
        axios.get(getSearchMovieUrl(params))
            .then(response => {
                const {data} = response;
                const {results} = data;
                dispatch(settingsActions.setWishMovies(results));
            })
            .catch(error => {
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to search the movies`,
                    type: 'error'
                }));
            });
    };
};

export const saveWishMovie = (wishMovie) => {
    return async (dispatch) => {
        dispatch(settingsActions.setLoader(Loader.wishMovie));
        axios.post(movieApi.post.saveWishMovie, wishMovie)
            .then(response => {
                const {data} = response;
                dispatch(settingsActions.setResult(data));
                dispatch(fetchWishlist());
            })
            .catch(error => {
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to add movie '${wishMovie.title}' to wishlist`,
                    type: 'error'
                }));
            });
    };
};

export const saveSingleMovie = (movie) => {
    return async (dispatch) => {
        dispatch(settingsActions.setLoader(Loader.folderScan));
        axios.post(movieApi.post.uploadMovie, movie)
            .then(response => {
                const {data} = response;
                dispatch(settingsActions.setResult(data));
                dispatch(fetchMovies());
            })
            .catch(error => {
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to upload ${movie.fileName} from ${movie.fileLocation} folder`,
                    type: 'error'
                }));
            });
    };
};

export const scanFolderAndSave = (path) => {
    return async (dispatch) => {
        dispatch(settingsActions.setLoader(Loader.folderScan));
        axios.post(UrlUtils.getScanFolderUrl(path))
            .then(response => {
                const {data} = response;
                dispatch(settingsActions.setResults(data));
                dispatch(fetchMovies());
            })
            .catch(error => {
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to scan folder ${path} for movies`,
                    type: 'error'
                }));
            });
    };
};
