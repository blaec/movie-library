import React, {useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {isArrayExist, isObjectExist} from "../../../../../utils/Utils";
import {getImageUrl, posterSizes} from "../../../../../utils/UrlUtils";
import {updateMoviePosters} from "../../../../../store/state/collection/collection-actions";

const useStyles = makeStyles((theme) => ({
    images: {
        display: 'flex',
        overflow: 'auto',
        marginTop: theme.spacing(2),
    },
    selected: {
        opacity: '50%',
        cursor: 'pointer'
    }
}));

const posterRefreshDialog = (props) => {
    const {open, movie: {posterPath, posterPathRu, id}, onExit} = props;
    const {t} = useTranslation('common');
    const {images, selected} = useStyles();
    const [posterEnSelected, setPosterEnSelected] = useState(posterPath);
    const [posterRuSelected, setPosterRuSelected] = useState(posterPathRu);

    const postersEn = useSelector(state => state.collection.postersEn);
    const postersRu = useSelector(state => state.collection.postersRu);
    const dispatch = useDispatch();

    const handleUpdateEnPoster = (posterUrl) => {
        setPosterEnSelected(posterUrl);
    };
    const handleUpdateRuPoster = (posterUrl) => {
        setPosterRuSelected(posterUrl);
    };

    const handleUpdatePoster = () => {
        const posterEn = posterEnSelected === posterPath
            ? ''
            : posterEnSelected;
        const posterRu = posterRuSelected === posterPathRu
            ? ''
            : posterRuSelected;
        if (isObjectExist(posterEn) || isObjectExist(posterRu)) {
            dispatch(updateMoviePosters(id, posterEnSelected, posterRuSelected));
        }
        onExit();
    };

    let posterEnGallery = null;
    if (isArrayExist(postersEn)) {
        posterEnGallery = postersEn.map((image, index) => {
            const {file_path} = image;
            return (
                <img
                    className={file_path !== posterEnSelected ? selected : null}
                    key={index}
                    height={250}
                    src={getImageUrl(file_path, posterSizes.w342)}
                    alt=''
                    onClick={() => handleUpdateEnPoster(file_path)}
                />
            );
        });
    }

    let posterRuGallery = null;
    if (isArrayExist(postersRu)) {
        posterRuGallery = postersRu.map((image, index) => {
            const {file_path} = image;
            return (
                <img
                    className={file_path !== posterRuSelected ? selected : null}
                    key={index}
                    height={250}
                    src={getImageUrl(file_path, posterSizes.w342)}
                    alt=''
                    onClick={() => handleUpdateRuPoster(file_path)}
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
                    caption={t('button.no')}
                    onClick={onExit}/>
                <MyDialogButton
                    type="danger"
                    caption={t('button.yes')}
                    onClick={handleUpdatePoster}
                />
            </DialogActions>
        </Dialog>
    );
};

export default posterRefreshDialog;