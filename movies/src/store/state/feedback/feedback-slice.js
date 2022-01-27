import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    snackbar: {
        message: '',
        type: 'success',
        uniqueId: 0,
    },
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setSnackbar(state, action) {
            const {type, message} = action.payload;
            state.snackbar.type = type;
            state.snackbar.message = message;
            state.snackbar.uniqueId = new Date().getTime();
        },
    }
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;