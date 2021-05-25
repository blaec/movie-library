import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    wishlist: [],
    selectedMovie: {},
    filteredMovies: [],
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setMoviesCollection(state, action) {
            state.movies = action.payload;
        },
        setWishlistCollection(state, action) {
            state.wishlist = action.payload;
        },
        setSelectedMovie(state, action) {
            state.selectedMovie = action.payload;
        },
        setFilteredMovies(state, action) {
            state.filteredMovies = action.payload;
        },
    }
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;