import axios from "../axios-movies";
import {getMovieCreditsUrl} from "../utils/UrlUtils";
import {detailsActions} from "./details-slice";

export const fetchCast = (movieId, tmdbApi) => {
    return async (dispatch) => {
        axios.get(getMovieCreditsUrl(movieId, tmdbApi))
            .then(response => {
                const {data: {cast}} = response;
                dispatch(detailsActions.setCast(cast));
            })
            .catch(error => {
                console.log(error);
            });
    };
};
