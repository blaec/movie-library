import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    tmdb: {tmdbApi: '', hasTmdbApi: false},
    omdb: {omdbApi: '', hasOmdbApi: false},
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        initConfig(state, action) {
            const {tmdbApiKey, omdbApiKey} = action.payload;
            state.tmdb = {tmdbApi: tmdbApiKey, hasTmdbApi: true};
            state.omdb = {omdbApi: omdbApiKey, hasOmdbApi: true};
        },
    }
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;