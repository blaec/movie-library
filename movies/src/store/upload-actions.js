import axios from "../axios-movies";
import {getSearchMovieUrl, movieApi} from "../utils/UrlUtils";
import {uploadActions} from "./upload-slice";
import {feedbackActions} from "./feedback-slice";
import {fetchWishlist} from "./collection-actions";

export const fetchWishMovies = (params) => {
    return async (dispatch) => {
        axios.get(getSearchMovieUrl(params))
            .then(response => {
                const {data} = response;
                const {results} = data;
                dispatch(uploadActions.setWishMovies(results));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    open: true,
                    message: `Failed to search the movies`,
                    type: 'error'
                }));
            });
    };
};

export const saveWishMovie = (wishMovie) => {
    return async (dispatch) => {
        console.log(movieApi.post.saveWishMovie);
        axios.post(movieApi.post.saveWishMovie, wishMovie)
            .then(response => {
                const {data} = response;
                dispatch(uploadActions.setResult(data));
                dispatch(fetchWishlist());
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    open: true,
                    message: `Failed to add movie '${wishMovie.title}' to wishlist`,
                    type: 'error'
                }));
            });
    };
};

