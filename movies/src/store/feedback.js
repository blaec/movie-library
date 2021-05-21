import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    snackbar: {
        open: false,
        message: '',
        type: 'success'
    },
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setSnackbar(state, action) {
            const {open, type, message} = action.payload;
            state.snackbar.open = open;
            state.snackbar.type = type;
            state.snackbar.message = message;
        },
    }
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;