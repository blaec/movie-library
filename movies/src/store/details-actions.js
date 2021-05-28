import axios from "../axios-movies";
import {getMovieCreditsUrl, getMovieDetailsUrl, getOmdbMovieDetails} from "../utils/UrlUtils";
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

export const fetchMovieTmdbDetails = (movieId, tmdbApi) => {
    return async (dispatch) => {
        axios.get(getMovieDetailsUrl(movieId, tmdbApi))
            .then(response => {
                const {data} = response;
                dispatch(detailsActions.setMovieTmdbDetails(data));

                const {imdb_id} = data;
                dispatch(detailsActions.setImdbId(imdb_id));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const fetchMovieOmdbDetails = (imdbId, omdbApi) => {
    return async (dispatch) => {
        axios.get(getOmdbMovieDetails(imdbId, omdbApi))
            .then(response => {
                const {data} = response;
                dispatch(detailsActions.setMovieOmdbDetails(data));
            })
            .catch(error => {
                console.log(error);
            });
    };
};
