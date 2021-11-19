import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import MyDialogButton from "../../../../../UI/Buttons/MyDialogButton";
import {isArrayExist, isStringExist} from "../../../../../utils/Utils";
import {getImageUrl, posterSizes} from "../../../../../utils/UrlUtils";
import {updateMoviePosters} from "../../../../../store/state/collection/collection-actions";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Paper
} from "@material-ui/core";

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

const posterUpdateDialog = (props) => {
    const {open, movie: {posterPath, posterPathRu, id}, onExit} = props;
    const {images, selected} = useStyles();
    const [posterEnSelected, setPosterEnSelected] = useState(posterPath);
    const [posterRuSelected, setPosterRuSelected] = useState(posterPathRu);
    const {t} = useTranslation('common');

    const postersEn = useSelector(state => state.collection.postersEn);
    const postersRu = useSelector(state => state.collection.postersRu);
    const dispatch = useDispatch();

    const handleUpdatePoster = () => {
        const posterEn = getIfNew(posterPath, posterEnSelected);
        const posterRu = getIfNew(posterPathRu, posterRuSelected);
        if (isStringExist(posterEn) || isStringExist(posterRu)) {
            dispatch(updateMoviePosters(id, posterEnSelected, posterRuSelected));
        }
        onExit();
    };
    const getIfNew = (currentValue, newValue) => {
        return currentValue === newValue ? '' : newValue;
    };

    const createPosterGallery = (posters, selectedPoster, setSelectedPoster) => {
        let posterGallery = null;
        if (isArrayExist(posters)) {
            posterGallery = posters.map((image, index) => {
                const {file_path} = image;
                return (
                    <img
                        className={file_path !== selectedPoster ? selected : null}
                        key={index}
                        height={200}
                        src={getImageUrl(file_path, posterSizes.w342)}
                        alt=''
                        onClick={() => setSelectedPoster(file_path)}
                    />
                );
            });
        }
        return posterGallery;
    }
    const posterEnGallery = createPosterGallery(postersEn, posterEnSelected, setPosterEnSelected);
    const posterRuGallery = createPosterGallery(postersRu, posterRuSelected, setPosterRuSelected);

    return (
        <Dialog
            open={open}
            onClose={onExit}
        >
            <DialogTitle>
                {t('text.updatePoster')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('helperText.updatePosterExplanation')}
                </DialogContentText>
                <Paper className={images} square>
                    {posterEnGallery}
                </Paper>
                <Paper className={images} square>
                    {posterRuGallery}
                </Paper>
            </DialogContent>
            <DialogActions>
                <MyDialogButton
                    type="success"
                    caption={t('button.cancel')}
                    onClick={onExit}/>
                <MyDialogButton
                    type="danger"
                    caption={t('button.update')}
                    onClick={handleUpdatePoster}
                />
            </DialogActions>
        </Dialog>
    );
};

export default posterUpdateDialog;