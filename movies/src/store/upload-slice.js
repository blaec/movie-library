import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    wishMovies: [],
    result: {},
};

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setWishMovies(state, action) {
            state.wishMovies = action.payload;
        },
        setResult(state, action) {
            state.result = action.payload;
        },
    }
});

export const uploadActions = uploadSlice.actions;
export default uploadSlice.reducer;