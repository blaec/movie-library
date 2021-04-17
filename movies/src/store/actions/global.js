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

export const deleteMovies = (movies) => {
    return {
        type: actionTypes.DELETE_MOVIE,
        movies: movies
    }
};

export const setGenreIds = (ids) => {
    return {
        type: actionTypes.SET_GENRE_IDS,
        genreIds: ids
    }
};

export const initConfigs = (configs) => {
    return {
        type: actionTypes.INIT_CONFIGS,
        configs: configs
    }
};

