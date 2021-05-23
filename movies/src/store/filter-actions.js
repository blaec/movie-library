import axios from "../axios-movies";
import {getAllGenresUrl} from "../utils/UrlUtils";
import {filterActions} from "./filter-slice";

export const fetchGenres = (tmdbApi) => {
    return async (dispatch) => {
        axios.get(getAllGenresUrl(tmdbApi))
            .then(response => {
                const {data: {genres}} = response;
                dispatch(filterActions.setGenres(genres));
            })
            .catch(error => {
                console.log(error);
            });
    };
};
