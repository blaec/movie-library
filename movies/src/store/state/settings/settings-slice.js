import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    wishMovies: [],
    result: {},
    results: [],
    loader: 0,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWishMovies(state, action) {
            state.wishMovies = action.payload;
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