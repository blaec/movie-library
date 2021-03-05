import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

import MyDialogButton from "../../../UI/Buttons/MyDialogButton";

const deleteDialog = (props) => {

    return (
        <Dialog open={props.open}
                onClose={props.exit}
        >
            <DialogTitle>
                Delete Movie
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
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