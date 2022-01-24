import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cast: {cast: [], hasCast: false},
    movieTmdbDetails: {},
    movieOmdbDetails: {},
    actorDetails: {},
    actorImages: {},
    imdbId: '',
    trailers: [],
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setCast(state, action) {
            state.cast = {cast: action.payload, hasCast: true};
        },
        setMovieTmdbDetails(state, action) {
            state.movieTmdbDetails = action.payload;
        },
        setMovieOmdbDetails(state, action) {
            state.movieOmdbDetails = action.payload;
        },
        setActorDetails(state, action) {
            state.actorDetails = action.payload;
        },
        setActorImages(state, action) {
            state.actorImages = action.payload;
        },
        setImdbId(state, action) {
            state.imdbId = action.payload;
        },
        resetAll(state, action) {
            state.cast = {cast: [], hasCast: false};
            state.movieTmdbDetails = {};
            state.movieOmdbDetails = {};
            state.actorDetails = {};
            state.actorImages = {};
            state.imdbId = '';
            state.trailers = [];
        },
        setTrailers(state, action) {
            state.trailers = action.payload;
        },
    }
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice.reducer;