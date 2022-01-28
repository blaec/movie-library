import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    cast: {cast: [], hasCast: false},
    movieTmdbDetails: {tmdbMovieDetails: {}, hasTmdbMovieDetails: false},
    movieOmdbDetails: {omdbMovieDetails: {}, hasOmdbMovieDetails: false},
    actorDetails: {actorDetails: {}, hasActorDetails: false},
    actorImages: {actorImages: {}, hasActorImages: false},
    imdbId: {imdbId: '', hasImdbId: false},
    trailers: {trailers: [], hasTrailers: false},
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setCast(state, action) {
            state.cast = {cast: action.payload, hasCast: true};
        },
        setMovieTmdbDetails(state, action) {
            state.movieTmdbDetails = {tmdbMovieDetails: action.payload, hasTmdbMovieDetails: true};
        },
        setMovieOmdbDetails(state, action) {
            state.movieOmdbDetails = {omdbMovieDetails: action.payload, hasOmdbMovieDetails: true};
        },
        setActorDetails(state, action) {
            state.actorDetails = {actorDetails: action.payload, hasActorDetails: true};
        },
        setActorImages(state, action) {
            state.actorImages = {actorImages: action.payload, hasActorImages: true};
        },
        setImdbId(state, action) {
            state.imdbId = {imdbId: action.payload, hasImdbId: true};
        },
        setTrailers(state, action) {
            state.trailers = {trailers: action.payload, hasTrailers: true};
        },
        resetAll(state, action) {
            state.cast = initialState.cast;
            state.movieTmdbDetails = initialState.movieTmdbDetails;
            state.movieOmdbDetails = initialState.movieOmdbDetails;
            state.actorDetails = initialState.actorDetails;
            state.actorImages = initialState.actorImages;
            state.imdbId = initialState.imdbId;
            state.trailers = initialState.trailers;
        },
    }
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice.reducer;