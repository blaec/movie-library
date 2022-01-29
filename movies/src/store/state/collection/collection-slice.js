import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    movies: [], // todo useGallery
    newMovies: [], // todo useGallery
    wishlist: [], // todo useGallery
    filteredMovies: {filteredMovies: [], isFilteredMoviesLoaded: false},
    nowPlaying: [], // todo useGallery
    anticipated: [], // todo useGallery
    library: [],
    postersEn: {postersEn: [], isPostersEnLoaded: false},
    postersRu: {postersRu: [], isPostersRuLoaded: false},
    posterResults: {posterResults: [], isPosterResultsLoaded: false},
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setMoviesCollection(state, action) {
            state.movies = action.payload;
        },
        setNewMoviesCollection(state, action) {
            state.newMovies = action.payload;
        },
        setWishlistCollection(state, action) {
            state.wishlist = action.payload;
        },
        setFilteredMovies(state, action) {
            state.filteredMovies = {filteredMovies: action.payload, isFilteredMoviesLoaded: true};
        },
        resetFilteredMovies(state) {
            state.filteredMovies = initialState.filteredMovies;
        },
        setNowPlaying(state, action) {
            state.nowPlaying = action.payload;
        },
        setAnticipated(state, action) {
            state.anticipated = action.payload;
        },
        setLibrary(state, action) {
            state.library = action.payload;
        },
        setPostersEn(state, action) {
            state.postersEn = {postersEn: action.payload, isPostersEnLoaded: true};
        },
        setPostersRu(state, action) {
            state.postersRu = {postersRu: action.payload, isPostersRuLoaded: true};
        },
        setPosterResults(state, action) {
            state.posterResults = {posterResults: action.payload, isPosterResultsLoaded: true};
        },
        resetPosterResults(state, action) {
            state.posterResults = initialState.posterResults;
        },
    }
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;