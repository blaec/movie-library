import axios from "../../../axios-movies";
import {getSearchMovieUrl, movieApi} from "../../../utils/UrlUtils";
import {addNewActions} from "./addNew-slice";
import {feedbackActions} from "../feedback/feedback-slice";
import {fetchMovies, fetchWishlist} from "../collection/collection-actions";
import * as UrlUtils from "../../../utils/UrlUtils";
import {Loader} from "../../../utils/Constants";

export const fetchWishMovies = (params) => {
    return async (dispatch) => {
        dispatch(addNewActions.setLoader(Loader.wishMovie));
        axios.get(getSearchMovieUrl(params))
            .then(response => {
                const {data} = response;
                const {results} = data;
                dispatch(addNewActions.setWishMovies(results));
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
        dispatch(addNewActions.setLoader(Loader.wishMovie));
        axios.post(movieApi.post.saveWishMovie, wishMovie)
            .then(response => {
                const {data} = response;
                dispatch(addNewActions.setResult(data));
                dispatch(fetchWishlist());
            })
            .catch(error => {
                const message = (error?.response?.status === 403)
                    ? `${error.response.data} | You are not allowed to add movie '${wishMovie.title}' to wishlist, please, contact administrator to gain access.`
                    : `${error} | Failed to add movie '${wishMovie.title}' to wishlist`;
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: message,
                    type: 'error'
                }));
            });
    };
};

export const saveSingleMovie = (movie) => {
    return async (dispatch) => {
        dispatch(addNewActions.setLoader(Loader.folderScan));
        axios.post(movieApi.post.uploadMovie, movie)
            .then(response => {
                const {data} = response;
                dispatch(addNewActions.setResult(data));
                dispatch(fetchMovies());
            })
            .catch(error => {
                const message = (error?.response?.status === 403)
                    ? `${error.response.data} | You are not allowed to upload ${movie.fileName} from ${movie.fileLocation} folder, please, contact administrator to gain access.`
                    : `${error} | Failed to upload ${movie.fileName} from ${movie.fileLocation} folder`;
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: message,
                    type: 'error'
                }));
            });
    };
};

export const scanFolderAndSave = (path) => {
    return async (dispatch) => {
        dispatch(addNewActions.setLoader(Loader.folderScan));
        axios.post(UrlUtils.getScanFolderUrl(path))
            .then(response => {
                const {data} = response;
                dispatch(addNewActions.setResults(data));
                dispatch(fetchMovies());
            })
            .catch(error => {
                const message = (error?.response?.status === 403)
                    ? `${error.response.data} | You are not allowed to scan folder ${path} for movies, please, contact administrator to gain access.`
                    : `${error} | Failed to scan folder ${path} for movies`;
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: message,
                    type: 'error'
                }));
            });
    };
};
