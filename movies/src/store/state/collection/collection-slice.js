import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    newMovies: [],
    wishlist: [],
    filteredMovies: {data: [], hasResult: false},
    nowPlaying: [],
    anticipated: [],
    library: [],
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
    }
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;