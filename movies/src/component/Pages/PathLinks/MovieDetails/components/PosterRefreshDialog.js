import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import MyDialogButton from "../../../../../UI/Buttons/MyDialogButton";
import {useTranslation} from "react-i18next";

const posterRefreshDialog = (props) => {
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
                    caption={t('text.no')}
                    onClick={onExit}/>
                <MyDialogButton
                    type="danger"
                    caption={t('text.yes')}
                    onClick={onDelete}/>
            </DialogActions>
        </Dialog>
    );
};

export default posterRefreshDialog;