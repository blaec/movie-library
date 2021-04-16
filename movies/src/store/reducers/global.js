import * as actionTypes from '../actions/actionTypes';

const initialState = {
    search: '',
    movies: {},
    genreIds: [],
    api: {
        tmdbApi: '',
        omdbApi: ''
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_FILTER:
            return {
                ...state,
                search: action.newSearch.toLowerCase()
            };
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                movies: action.movies
            };
        case actionTypes.DELETE_MOVIE:
            return {
                ...state,
                movies: action.movies
            };
        case actionTypes.SET_GENRE_IDS:
            return {
                ...state,
                genreIds: action.genreIds
            };
        case actionTypes.INIT_CONFIGS:
            return {
                ...state,
                api: {
                    tmdbApi: action.configs.tmdb.value.apikey,
                    omdbApi: action.configs.omdb.value.apikey
                }
            };
        default:
            return state;
    }
};

export default reducer;
