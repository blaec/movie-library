import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    tmdb: {tmdbApi: '', hasTmdbApi: false},
    omdb: '',
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        initConfig(state, action) {
            const {tmdbApiKey, omdbApiKey} = action.payload;
            state.tmdb = {tmdbApi: tmdbApiKey, hasTmdbApi: true};
            state.omdb = omdbApiKey;
        },
    }
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;