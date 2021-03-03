import React from 'react';
import MyDialogButton from "../../UI/Buttons/MyDialogButton";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const deleteDialog = (props) => {

    return (
        <Dialog
            open={props.open}
            onClose={props.exit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Delete movie"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to delete this movie?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MyDialogButton clicked={props.exit}
                                type="success"
                                caption="No"/>
                <MyDialogButton clicked={props.delete}
                                type="danger"
                                caption="Yes"/>
            </DialogActions>
        </Dialog>
    );
};

export default deleteDialog;