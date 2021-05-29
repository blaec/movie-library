import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    search: '',
    genres: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeSearch(state, action) {
            state.search = action.payload.toLowerCase();
        },
        setGenres(state, action) {
            state.genres = action.payload;
        },
    }
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;