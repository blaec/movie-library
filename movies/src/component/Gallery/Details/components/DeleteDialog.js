import React from 'react';

import MyDialogButton from "../../../../UI/Buttons/MyDialogButton";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const deleteDialog = (props) => {
    const {open, onExit, onDelete} = props;

    return (
        <Dialog open={open}
                onClose={onExit}
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
                <MyDialogButton type="success"
                                caption="No"
                                onClick={onExit}/>
                <MyDialogButton type="danger"
                                caption="Yes"
                                onClick={onDelete}/>
            </DialogActions>
        </Dialog>
    );
};

export default deleteDialog;