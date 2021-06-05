import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    newMovies: [],
    wishlist: [],
    filteredMovies: [],
    nowPlaying: [],
    anticipated: [],
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
        setNowPlaying(state, action) {
            state.nowPlaying = action.payload;
        },
        setAnticipated(state, action) {
            state.anticipated = action.payload;
        },
    }
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;