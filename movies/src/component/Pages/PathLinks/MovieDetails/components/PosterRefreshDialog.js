import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Paper
} from "@material-ui/core";
import MyDialogButton from "../../../../../UI/Buttons/MyDialogButton";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {isArraysExist} from "../../../../../utils/Utils";
import {getImageUrl, posterSizes} from "../../../../../utils/UrlUtils";

const useStyles = makeStyles((theme) => ({
    images: {
        display: 'flex',
        overflow: 'auto',
        marginTop: theme.spacing(2),
    },
}));

const posterRefreshDialog = (props) => {
    const {open, onExit, onDelete} = props;
    const {t} = useTranslation('common');
    const {images} = useStyles();

    const postersEn = useSelector(state => state.collection.postersEn);
    const postersRu = useSelector(state => state.collection.postersRu);

    let posterEnGallery = null;
    if (isArraysExist(postersEn)) {
        posterEnGallery = postersEn.map((image, index) => {
            const {file_path} = image;
            return (
                <img
                    key={index}
                    height={250}
                    src={getImageUrl(file_path, posterSizes.w342)}
                    alt=''
                />
            )
        });
    }

    let posterRuGallery = null;
    if (isArraysExist(postersRu)) {
        posterRuGallery = postersRu.map((image, index) => {
            const {file_path} = image;
            return (
                <img
                    key={index}
                    height={250}
                    src={getImageUrl(file_path, posterSizes.w342)}
                    alt=''
                />
            )
        });
    }

    return (
        <Dialog
            open={open}
            onClose={onExit}
        >
            <DialogTitle>
                {t('text.deleteMovie')}
            </DialogTitle>
            <DialogContent>
                <Paper className={images} square>
                    {posterEnGallery}
                </Paper>
                <Paper className={images} square>
                    {posterRuGallery}
                </Paper>
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