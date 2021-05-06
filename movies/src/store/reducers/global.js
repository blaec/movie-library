import * as actionTypes from '../actions/actionTypes';

const initialState = {
    search: '',
    movies: {},
    wishlist: {},
    selectedMovieDetails: {},
    genreIds: [],
    api: {
        tmdbApi: '',
        omdbApi: ''
    },
    snackbar: {
        open: false,
        message: '',
        type: 'success'
    },
};

const reducer = (state = initialState, action) => {
    const {type : actionType, newSearch, movies, wishlist, selectedMovieDetails, genreIds, configs, snackbar} = action;
    switch (actionType) {
        case actionTypes.CHANGE_FILTER:
            return {
                ...state,
                search: newSearch.toLowerCase()
            };
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                movies: movies
            };
        case actionTypes.DELETE_MOVIE:
            return {
                ...state,
                movies: movies
            };
        case actionTypes.SET_WISHLIST:
            return {
                ...state,
                wishlist: wishlist
            };
        case actionTypes.DELETE_WISHLIST:
            return {
                ...state,
                wishlist: wishlist
            };
        case actionTypes.SET_SELECTED_MOVIE_DETAILS:
            return {
                ...state,
                selectedMovieDetails: selectedMovieDetails
            };
        case actionTypes.SET_GENRE_IDS:
            return {
                ...state,
                genreIds: genreIds
            };
        case actionTypes.INIT_CONFIGS:
            const {
                tmdb: {value: {apikey: tmdbApiKey}},
                omdb: {value: {apikey: omdbApiKey}}
            } = configs;
            return {
                ...state,
                api: {
                    tmdbApi: tmdbApiKey,
                    omdbApi: omdbApiKey
                }
            };
        case actionTypes.SET_SNACKBAR:
            const {open, type, message} = snackbar;
            return {
                ...state,
                snackbar: {
                    open: open,
                    type: type,
                    message: message
                }
            };
        default:
            return state;
    }
};

export default reducer;
