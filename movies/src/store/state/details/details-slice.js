import {createSlice} from '@reduxjs/toolkit';

import {isObjectExist} from "../../../utils/Utils";


const initialState = {
    cast: {cast: [], hasCast: false},
    movieTmdbDetails: {tmdbMovieDetails: {}, hasTmdbMovieDetails: false},
    movieOmdbDetails: {omdbMovieDetails: {}, hasOmdbMovieDetails: false},
    actorDetails: {actorDetails: {}, hasActorDetails: false},
    actorImages: {actorImages: {}, hasActorImages: false},
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
            const {payload} = action;
            state.movieTmdbDetails = {tmdbMovieDetails: payload, hasTmdbMovieDetails: isObjectExist(payload)};
        },
        setMovieOmdbDetails(state, action) {
            const {payload} = action;
            state.movieOmdbDetails = {omdbMovieDetails: payload, hasOmdbMovieDetails: isObjectExist(payload)};
        },
        setActorDetails(state, action) {
            const {payload} = action;
            state.actorDetails = {actorDetails: payload, hasActorDetails: isObjectExist(payload)};
        },
        setActorImages(state, action) {
            const {payload} = action;
            state.actorImages = {actorImages: payload, hasActorImages: isObjectExist(payload)};
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