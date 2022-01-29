import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import MyDialogButton from "../../../../../UI/Buttons/MyDialogButton";
import MyResponse from "../../../../../UI/MyResponse";
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
    posters: {
        display: 'flex',
        overflow: 'auto',
        marginTop: theme.spacing(2),
    },
    newPoster: {
        opacity: '50%',
        cursor: 'pointer'
    }
}));

const getIfNew = (currentValue, newValue) => {
    return currentValue === newValue ? '' : newValue;
};

const posterUpdateDialog = (props) => {
    const {open, movie, onExit} = props;
    const {posterPath, posterPathRu} = movie;
    const {posters, newPoster} = useStyles();
    const [posterEnSelected, setPosterEnSelected] = useState(posterPath);
    const [posterRuSelected, setPosterRuSelected] = useState(posterPathRu);
    const [disableUpdate, setDisableUpdate] = useState(true);
    const {t} = useTranslation('common');

    const {postersEn, isPostersEnLoaded} = useSelector(state => state.collection.postersEn);
    const {postersRu, isPostersRuLoaded} = useSelector(state => state.collection.postersRu);
    const dispatch = useDispatch();

    const handlePosterEnSelect = (posterUrl) => {
        setPosterEnSelected(posterUrl);
        setDisableUpdate(isCurrentPosters(posterUrl, posterRuSelected));
    };

    const handlePosterRuSelect = (posterUrl) => {
        setPosterRuSelected(posterUrl);
        setDisableUpdate(isCurrentPosters(posterEnSelected, posterUrl));
    };

    const handleUpdatePoster = () => {
        if (hasNewPoster(posterEnSelected, posterRuSelected)) {
            const updatedMovie = {
                ...movie,
                posterPath: posterEnSelected,
                posterPathRu: posterRuSelected
            }
            dispatch(updateMoviePosters(updatedMovie));
        }
        onExit();
    };
    const hasNewPoster = (posterEnSelected, posterRuSelected) => {
        const posterEn = getIfNew(posterPath, posterEnSelected);
        const posterRu = getIfNew(posterPathRu, posterRuSelected);
        return isStringExist(posterEn) || isStringExist(posterRu)
    };
    const isCurrentPosters = (posterEnSelected, posterRuSelected) => {
        return !hasNewPoster(posterEnSelected, posterRuSelected)
    };

    const createPosterGallery = (posters, selectedPoster, setSelectedPoster) => {
        let posterGallery = null;
        if (isArrayExist(posters)) {
            posterGallery = posters.map((image, index) => {
                const {file_path} = image;
                return (
                    <img
                        className={file_path !== selectedPoster ? newPoster : null}
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
    const posterEnGallery = isPostersEnLoaded
        ? createPosterGallery(postersEn, posterEnSelected, handlePosterEnSelect)
        : null;
    const posterRuGallery = isPostersRuLoaded
        ? createPosterGallery(postersRu, posterRuSelected, handlePosterRuSelect)
        : null;

    let dialogContent = (
        <React.Fragment>
            <MyResponse message={t('helperText.NoPosterFound')}/>
        </React.Fragment>
    );
    if (posterEnGallery !== null || posterRuGallery !== null) {
        dialogContent = (
            <React.Fragment>
                <DialogContentText>
                    {t('helperText.updatePosterExplanation')}
                </DialogContentText>
                <Paper className={posters} square>
                    {posterEnGallery}
                </Paper>
                <Paper className={posters} square>
                    {posterRuGallery}
                </Paper>
            </React.Fragment>
        );
    }

    return (
        <Dialog
            open={open}
            onClose={onExit}
        >
            <DialogTitle>
                {t('text.updatePoster')}
            </DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>
            <DialogActions>
                <MyDialogButton
                    type="success"
                    caption={t('button.cancel')}
                    onClick={onExit}/>
                <MyDialogButton
                    type="danger"
                    caption={t('button.update')}
                    disabled={disableUpdate}
                    onClick={handleUpdatePoster}
                />
            </DialogActions>
        </Dialog>
    );
};

export default posterUpdateDialog;