import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    wishMovies: [],
    result: {},
    results: [],
    loader: 0,
};

const uploadSlice = createSlice({
    name: 'upload',
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

export const uploadActions = uploadSlice.actions;
export default uploadSlice.reducer;