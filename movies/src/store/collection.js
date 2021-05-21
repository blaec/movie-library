import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    movies: {},
    wishlist: {},
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
        // deleteFromMoviesCollection(state, action) {
        //     state.movies = action.payload;
        // },
        // deleteFromWishlistCollection(state, action) {
        //     state.wishlist = action.payload;
        // },
    }
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;