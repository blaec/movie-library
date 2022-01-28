import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    cast: {cast: [], isCastLoaded: false},
    movieTmdbDetails: {tmdbMovieDetails: {}, isTmdbMovieDetailsLoaded: false},
    movieOmdbDetails: {omdbMovieDetails: {}, isOmdbMovieDetailsLoaded: false},
    actorDetails: {actorDetails: {}, isActorDetailsLoaded: false},
    actorImages: {actorImages: {}, isActorImagesLoaded: false},
    imdbId: {imdbId: '', isImdbIdLoaded: false},
    trailers: {trailers: [], isTrailersLoaded: false},
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setCast(state, action) {
            state.cast = {cast: action.payload, isCastLoaded: true};
        },
        setMovieTmdbDetails(state, action) {
            state.movieTmdbDetails = {tmdbMovieDetails: action.payload, isTmdbMovieDetailsLoaded: true};
        },
        setMovieOmdbDetails(state, action) {
            state.movieOmdbDetails = {omdbMovieDetails: action.payload, isOmdbMovieDetailsLoaded: true};
        },
        setActorDetails(state, action) {
            state.actorDetails = {actorDetails: action.payload, isActorDetailsLoaded: true};
        },
        setActorImages(state, action) {
            state.actorImages = {actorImages: action.payload, isActorImagesLoaded: true};
        },
        setImdbId(state, action) {
            state.imdbId = {imdbId: action.payload, isImdbIdLoaded: true};
        },
        setTrailers(state, action) {
            state.trailers = {trailers: action.payload, isTrailersLoaded: true};
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