import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tmdbApi: '',
    omdbApi: ''
};

const reducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case actionTypes.INIT_CONFIGS:
            return {
                ...state,
                tmdbApi:  action.tmdb.value,
                omdbApi: action.omdb.value
            };
        default:
            return state;
    }
};

export default reducer;
