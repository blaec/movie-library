import React from 'react';
import {useTranslation} from "react-i18next";

import MyDialogButton from "../../../../../UI/Buttons/MyDialogButton";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const deleteDialog = (props) => {
    const {open, onExit, onDelete} = props;
    const {t} = useTranslation('common');

    return (
        <Dialog
            open={open}
            onClose={onExit}
        >
            <DialogTitle>
                {t('text.deleteMovie')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('helperText.deleteMovieQuery')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MyDialogButton
                    type="success"
                    caption={t('button.no')}
                    onClick={onExit}/>
                <MyDialogButton
                    type="danger"
                    caption={t('button.yes')}
                    onClick={onDelete}/>
            </DialogActions>
        </Dialog>
    );
};

export default deleteDialog;