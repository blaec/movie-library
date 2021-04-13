import React from 'react';

import {Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mySnackbar = (props) => {
    const {open, close, message, type} = props;

    return (
        <Snackbar open={open}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                  }}
                  autoHideDuration={5000}
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