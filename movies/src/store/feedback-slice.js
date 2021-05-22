import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    snackbar: {
        open: false,
        message: '',
        type: 'success'
    },
    isLoading: false
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
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;