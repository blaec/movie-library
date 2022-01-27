import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    search: {search: '', hasSearch: false},
    genres: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeSearch(state, action) {
            const {payload} = action;
            state.search = {search: payload.toLowerCase(), hasSearch: payload.length > 0};
        },
        setGenres(state, action) {
            state.genres = action.payload;
        },
    }
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;