import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MyArrowBack from "../../../../../UI/Buttons/Icons/MyArrowBack";
import MyControlIcon from "../../../../../UI/Buttons/Icons/MyControlIcon";
import {getImageUrl} from "../../../../../utils/UrlUtils";
import DeleteDialog from "./DeleteDialog";
import MyLoader from "../../../../../UI/Spinners/MyLoader";
import {drawer} from "../../../../../utils/Constants";
import {fullTitle, isArraysExist, isMovieInCollection, isObjectExist} from "../../../../../utils/Utils";
import {uploadActions} from "../../../../../store/state/upload/upload-slice";
import {feedbackActions} from "../../../../../store/state/feedback/feedback-slice";
import {deleteMovie} from "../../../../../store/state/collection/collection-actions";
import {saveWishMovie} from "../../../../../store/state/upload/upload-actions";
import {selectedMovieId} from "../../../../../store/localStorage/actions";

import Carousel from "react-material-ui-carousel";
import {makeStyles} from "@material-ui/core/styles";

const CAROUSEL_TIMEOUT = 300;
const MOBILE_WIN_WIDTH = 600;

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    }
}));


const backdropImage = props => {
    const {onClose} = props;
    const {root} = useStyles();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isInCollection, setIsInCollection] = useState(false);

    const saveResult = useSelector(state => state.upload.result);
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const movies = useSelector(state => state.collection.movies);
    const wishlist = useSelector(state => state.collection.wishlist);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    let id = selectedMovieId().getNumeric();

    const marginBorders = (window.innerHeight < window.innerWidth)
        ? window.innerWidth > 1000 ? .5 : .8
        : 1;
    const drawerWidth = window.innerWidth > MOBILE_WIN_WIDTH
        ? drawer.width
        : 0;
    const windowWidth = (window.innerWidth - drawerWidth) * marginBorders;

    const handleDeletedMovie = () => {
        setIsDeleting(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleting(false);
    };

    const handleDeleteMovie = () => {
        setIsDeleting(true);
        dispatch(deleteMovie(id));
    };

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
            const {id} = tmdbMovieDetails;
            setIsInCollection(isMovieInCollection(movies.concat(wishlist), id));
        }
    }, [movies, wishlist, tmdbMovieDetails]);

    let backdropImages = <MyLoader/>
    if (isObjectExist(tmdbMovieDetails)) {
        const {title, releaseDate, images: {backdrops}} = tmdbMovieDetails;
        backdropImages = backdrops.map((backdrop, idx) => {
            const {aspect_ratio, file_path} = backdrop;
            return (
                <img
                    key={idx + 1}
                    height={windowWidth / aspect_ratio}
                    src={getImageUrl(file_path)}
                    alt={`${fullTitle(title, releaseDate)}`}
                />
            );
        });
    }

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
                    animation="fade"
                    navButtonsAlwaysInvisible
                >
                    {backdropImages}
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