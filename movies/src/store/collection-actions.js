import axios from "../axios-movies";
import {movieApi} from "../utils/UrlUtils";
import {collectionActions} from "./collection-slice";
import {feedbackActions} from "./feedback-slice";

export const fetchMovies = () => {
    return async (dispatch) => {
        axios.get(movieApi.get.getAllMovies)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setMoviesCollection(data));
                // setIsLoading(false);
                dispatch(feedbackActions.setSnackbar({
                    open: true,
                    message: `Found ${data.length} movies`,
                    type: 'success'
                }));
            })
            .catch(error => {
                console.log(error);
                // setIsLoading(false);
                dispatch(feedbackActions.setSnackbar({
                    open: true,
                    message: `To load movies`,
                    type: 'error'
                }));
            });
    }
};