import React from 'react';

import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const mySnackbar = (props) => {
    const {open, close, message, type} = props;

    return (
        <Snackbar open={open}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                  }}
                  autoHideDuration={3000}
                  onClose={close}>
            <Alert onClose={close}
                   severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default mySnackbar;

export const initialSnackBarState = {open: false, message: '', type: ''};