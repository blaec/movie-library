import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    tmdb: '',
    omdb: '',
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        initConfig(state, action) {
            const {
                tmdb: {value: {apikey: tmdbApiKey}},
                omdb: {value: {apikey: omdbApiKey}}
            } = action.payload;
            state.tmdb = tmdbApiKey;
            state.omdb = omdbApiKey;
        },
    }
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;