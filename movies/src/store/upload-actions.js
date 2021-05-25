import axios from "../axios-movies";
import {getSearchMovieUrl} from "../utils/UrlUtils";
import {uploadActions} from "./upload-slice";
import {feedbackActions} from "./feedback-slice";

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

