import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    wishMovies: {wishMovies: [], hasWishMovies: false},
    result: {},
    results: [],
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
            state.result = action.payload;
        },
        setResults(state, action) {
            state.results = action.payload;
        },
        setLoader(state, action) {
            state.loader = action.payload;
        },
    }
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;