import * as actionTypes from '../actions/actionTypes';

const initialState = {
    search: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_FILTER:
            return {
                ...state,
                search: action.newSearch.toLowerCase()
            };
        default:
            return state;
    }
};

export default reducer;
