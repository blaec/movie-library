import * as actionTypes from './actionTypes';

export const changeSearch = (string) => {
    return {
        type: actionTypes.CHANGE_FILTER,
        newSearch: string
    }
};

export const setMovies = (movies) => {
    return {
        type: actionTypes.SET_MOVIES,
        movies: movies
    }
};