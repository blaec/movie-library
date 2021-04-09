import * as actionTypes from '../actions/actionTypes';

const initialState = {
    search: '',
    movies: {}
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
        default:
            return state;
    }
};

export default reducer;
