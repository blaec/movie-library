import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    wishMovies: [],
};

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setWishMovies(state, action) {
            state.wishMovies = action.payload;
        },
    }
});

export const uploadActions = uploadSlice.actions;
export default uploadSlice.reducer;