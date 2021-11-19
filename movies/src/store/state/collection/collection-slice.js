import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    newMovies: [],
    wishlist: [],
    filteredMovies: {data: [], hasResult: false},
    nowPlaying: [],
    anticipated: [],
    library: [],
    postersEn: [],
    postersRu: [],
    results: [],
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
            state.filteredMovies = action.payload;
        },
        resetFilteredMovies(state) {
            state.filteredMovies = {data: [], hasResult: false};
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
            state.postersEn = action.payload;
        },
        setPostersRu(state, action) {
            state.postersRu = action.payload;
        },
        setResults(state, action) {
            state.results = action.payload;
        },
    }
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;