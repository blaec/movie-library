import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import * as actions from "../store/actions";

import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {feedbackActions} from "../store/feedback";

const mySnackbar = () => {
    const snackbar = useSelector(state => state.feedback.snackbar);
    const {open, message, type} = snackbar;

    const dispatch = useDispatch();
    const onSetSnackbar = (settings) => dispatch(feedbackActions.setSnackbar(settings));

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        onSetSnackbar({open: false, type: type, message: message});
    };

    return (
        <Snackbar
            open={open}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
        >
            <Alert
                onClose={handleSnackbarClose}
                elevation={6}
                variant='filled'
                severity={type}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default mySnackbar;
