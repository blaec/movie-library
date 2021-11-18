import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";

import images from "./backdropComponents/Images";
import MyArrowBack from "../../../../../UI/Buttons/Icons/MyArrowBack";
import MyControlIcon from "../../../../../UI/Buttons/Icons/MyControlIcon";
import MyPosterRefresh from "../../../../../UI/Buttons/Icons/MyPosterRefresh";
import DeleteDialog from "./DeleteDialog";
import PosterRefreshDialog from "./PosterRefreshDialog";
import {getMovieByTmdbId, isArraysExist, isMovieInCollection, isObjectExist} from "../../../../../utils/Utils";
import {settingsActions} from "../../../../../store/state/settings/settings-slice";
import {feedbackActions} from "../../../../../store/state/feedback/feedback-slice";
import {deleteMovie} from "../../../../../store/state/collection/collection-actions";
import {saveWishMovie} from "../../../../../store/state/settings/settings-actions";

import Carousel from "react-material-ui-carousel";
import {makeStyles} from "@material-ui/core/styles";

const FADE_TIMEOUT = 500;
const INTERVAL = 3000;

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
}));


const backdropImage = props => {
    const {onClose} = props;
    const {root} = useStyles();
    const {movieTmdbId} = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPosterRefresh, setIsPosterRefresh] = useState(false);
    const [isInCollection, setIsInCollection] = useState(false);
    const {t} = useTranslation('common');

    const saveResult = useSelector(state => state.settings.result);
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const movies = useSelector(state => state.collection.movies);
    const wishlist = useSelector(state => state.collection.wishlist);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));


    const handleDeletedMovie = () => {
        setIsDeleting(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleting(false);
    };

    const handleDeleteMovie = () => {
        setIsDeleting(true);
        dispatch(deleteMovie(movieTmdbId));
    };

    const handlePosterRefresh = () => {
        setIsPosterRefresh(true);
    };

    const handleClosePosterRefreshDialog = () => {
        setIsPosterRefresh(false);
    }

    const handleAddToWatchMovie = () => {
        const {original_title} = tmdbMovieDetails;
        const watchMovie = {
            ...tmdbMovieDetails,
            title: original_title,
            genre_ids: tmdbMovieDetails.genres.map(genre => genre.id)
        };
        dispatch(saveWishMovie(watchMovie));
    };

    useEffect(() => {
        if (isObjectExist(saveResult)) {
            const {message, success} = saveResult;
            if (isDeleting) {
                const type = success ? 'success' : 'error';
                onSetSnackbar({message, type});
                dispatch(settingsActions.setResult({}));
                onClose();
            } else {
                const {title} = tmdbMovieDetails;
                if (success) {
                    onSetSnackbar({message: `${t('snackbar.addToWishlist', {title: title})}`, type: 'success'});
                } else {
                    onSetSnackbar({message: `${t('snackbar.failedToAddToWishlist', {title: title, message: message})}`, type: 'error'});
                }
                dispatch(settingsActions.setResult({}));
            }
        }
    }, [saveResult]);

    let hasMovieDetails = isArraysExist(movies, wishlist) && isObjectExist(tmdbMovieDetails);
    useEffect(() => {
        if (hasMovieDetails) {
            const {id} = tmdbMovieDetails;
            setIsInCollection(isMovieInCollection(movies.concat(wishlist), id));
        }
    }, [movies, wishlist, tmdbMovieDetails]);

    const selectedMovie = getMovieByTmdbId(movies.concat(wishlist), movieTmdbId);
    let posterSelector = null;
    if (isObjectExist(selectedMovie)) {
        posterSelector = (
            <PosterRefreshDialog
                open={isPosterRefresh}
                movie={selectedMovie}
                onExit={handleClosePosterRefreshDialog}
            />
        );
    }

    return (
        <React.Fragment>
            <div className={root}>
                <MyArrowBack onClose={onClose}/>
                <MyControlIcon
                    isInCollection={isInCollection}
                    canDisplay={hasMovieDetails}
                    onAddToWatch={handleAddToWatchMovie}
                    onDelete={handleDeletedMovie}
                />
                <MyPosterRefresh
                    isInCollection={isInCollection}
                    onShowModal={handlePosterRefresh}
                />
                <Carousel
                    timeout={FADE_TIMEOUT}
                    animation="fade"
                    interval={INTERVAL}
                    navButtonsAlwaysInvisible
                >
                    {images()}
                </Carousel>
            </div>
            <DeleteDialog
                open={isDeleting}
                onExit={handleCloseDeleteDialog}
                onDelete={handleDeleteMovie}
            />
            {posterSelector}
        </React.Fragment>
    );
};

export default backdropImage;