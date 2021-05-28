import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cast: [],
    movieTmdbDetails: {},
    movieOmdbDetails: {},
    imdbId: '',
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setCast(state, action) {
            state.cast = action.payload;
        },
        setMovieTmdbDetails(state, action) {
            state.movieTmdbDetails = action.payload;
        },
        setMovieOmdbDetails(state, action) {
            state.movieOmdbDetails = action.payload;
        },
        setImdbId(state, action) {
            state.imdbId = action.payload;
        },
    }
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice.reducer;