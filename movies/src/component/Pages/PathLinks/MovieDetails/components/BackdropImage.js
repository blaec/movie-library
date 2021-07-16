import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

import images from "./backdropComponents/Images";
import MyArrowBack from "../../../../../UI/Buttons/Icons/MyArrowBack";
import MyControlIcon from "../../../../../UI/Buttons/Icons/MyControlIcon";
import DeleteDialog from "./DeleteDialog";
import {isArraysExist, isMovieInCollection, isObjectExist} from "../../../../../utils/Utils";
import {uploadActions} from "../../../../../store/state/upload/upload-slice";
import {feedbackActions} from "../../../../../store/state/feedback/feedback-slice";
import {deleteMovie} from "../../../../../store/state/collection/collection-actions";
import {saveWishMovie} from "../../../../../store/state/upload/upload-actions";

import Carousel from "react-material-ui-carousel";
import {makeStyles} from "@material-ui/core/styles";

const CAROUSEL_TIMEOUT = 300;

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
    const [isInCollection, setIsInCollection] = useState(false);

    const saveResult = useSelector(state => state.upload.result);
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const movies = useSelector(state => state.collection.movies);
    const wishlist = useSelector(state => state.collection.wishlist);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    console.log(`render ${new Date().getTime()}`);

    const handleDeletedMovie = () => {
        console.log(`handleDeletedMovie`);
        setIsDeleting(true);
    };

    const handleCloseDeleteDialog = () => {
        console.log(`handleCloseDeleteDialog`);
        setIsDeleting(false);
    };

    const handleDeleteMovie = () => {
        console.log(`handleDeleteMovie`);
        setIsDeleting(true);
        dispatch(deleteMovie(movieTmdbId));
    };

    const handleAddToWatchMovie = () => {
        console.log(`handleAddToWatchMovie`);
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
            console.log(`useEffect [saveResult] ${new Date().getTime()}`);
            const {message, success} = saveResult;
            if (isDeleting) {
                const type = success ? 'success' : 'error';
                onSetSnackbar({message, type});
                dispatch(uploadActions.setResult({}));
                onClose();
            } else {
                const {title} = tmdbMovieDetails;
                if (success) {
                    onSetSnackbar({message: `Movie '${title}' added to wishlist`, type: 'success'});
                } else {
                    onSetSnackbar({message: `Failed to add movie '${title}' to wishlist: ${message}`, type: 'error'});
                }
                dispatch(uploadActions.setResult({}));
            }
        }
    }, [saveResult]);

    let hasMovieDetails = isArraysExist(movies, wishlist) && isObjectExist(tmdbMovieDetails);
    useEffect(() => {
        if (hasMovieDetails) {
            console.log(`useEffect [movies, wishlist, tmdbMovieDetails] ${new Date().getTime()}`);
            const {id} = tmdbMovieDetails;
            setIsInCollection(isMovieInCollection(movies.concat(wishlist), id));
        }
    }, [movies, wishlist, tmdbMovieDetails]);


    return (
        <React.Fragment>
            <div className={root}>
                <MyArrowBack onClose={onClose}/>
                {
                    hasMovieDetails &&
                    <MyControlIcon
                        isInCollection={isInCollection}
                        onAddToWatch={handleAddToWatchMovie}
                        onDelete={handleDeletedMovie}
                    />
                }
                <Carousel
                    timeout={CAROUSEL_TIMEOUT}
                    animation="slide"
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
        </React.Fragment>
    );
};

export default backdropImage;