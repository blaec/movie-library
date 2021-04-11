import React, {useState} from 'react';
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const mySnackbar = (props) => {
    const [open, setOpen] = useState(false);
    setOpen(props.open);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>
    );
};

export default mySnackbar;