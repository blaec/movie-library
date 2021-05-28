import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cast: [],
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setCast(state, action) {
            state.cast = action.payload;
        },
    }
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice.reducer;