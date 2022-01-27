import {createSlice} from '@reduxjs/toolkit';

import {isArrayExist, isObjectExist} from "../../../utils/Utils";


const initialState = {
    wishMovies: {wishMovies: [], hasWishMovies: false},
    result: {saveResult: {}, hasSaveResult: false},
    results: {saveResults: [], hasSaveResults: false},
    loader: 0,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWishMovies(state, action) {
            state.wishMovies = {wishMovies: action.payload, hasWishMovies: true};
        },
        setResult(state, action) {
            const {payload} = action;
            state.result = {saveResult: payload, hasSaveResult: isObjectExist(payload)};
        },
        setResults(state, action) {
            const {payload} = action;
            state.results = {saveResults: payload, hasSaveResults: isArrayExist(payload)};
        },
        setLoader(state, action) {
            state.loader = action.payload;
        },
    }
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;