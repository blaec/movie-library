import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    wishMovies: {wishMovies: [], isWishMoviesLoaded: false},
    result: {saveResult: {}, hasSaveResult: false},
    results: {saveResults: [], hasSaveResults: false},
    loader: 0,
};

const addNewSlice = createSlice({
    name: 'addNew',
    initialState,
    reducers: {
        setWishMovies(state, action) {
            state.wishMovies = {wishMovies: action.payload, isWishMoviesLoaded: true};
        },
        setResult(state, action) {
            state.result = {saveResult: action.payload, hasSaveResult: true};
        },
        resetResult(state, action) {
            state.result = initialState.result;
        },
        setResults(state, action) {
            state.results = {saveResults: action.payload, hasSaveResults: true};
        },
        resetResults(state, action) {
            state.results = initialState.results;
        },
        setLoader(state, action) {
            state.loader = action.payload;
        },
    }
});

export const addNewActions = addNewSlice.actions;
export default addNewSlice.reducer;