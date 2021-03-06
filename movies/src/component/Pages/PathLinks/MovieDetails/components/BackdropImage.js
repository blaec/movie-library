import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

import MyArrowBack from "../../../../../UI/Buttons/Icons/MyArrowBack";
import MyControlIcon from "../../../../../UI/Buttons/Icons/MyControlIcon";
import {getImageUrl} from "../../../../../utils/UrlUtils";
import DeleteDialog from "./DeleteDialog";
import MyLoader from "../../../../../UI/Spinners/MyLoader";
import {drawerWidth, fullTitle, isArraysExist, isMovieInCollection, isObjectExist} from "../../../../../utils/Utils";
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
    image: {
        objectFit: 'scale-down',
    }
}));


const backdropImage = props => {
    const {onClose} = props;
    const {root, image} = useStyles();
    const {movieTmdbId} = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isInCollection, setIsInCollection] = useState(false);

    const saveResult = useSelector(state => state.upload.result);
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const movies = useSelector(state => state.collection.movies);
    const wishlist = useSelector(state => state.collection.wishlist);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    const marginBorders = (window.innerHeight < window.innerWidth)
        ? window.innerWidth > 1000 ? .5 : .8
        : 1;
    const windowWidth = (window.innerWidth - drawerWidth(window.innerWidth)) * marginBorders;

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
        const {title, releaseDate, images: {backdrops}, poster_path} = tmdbMovieDetails;
        const backdropsData = isArraysExist(backdrops)
            ? backdrops
            : [{
                aspect_ratio: 16 / 9,
                file_path: poster_path

            }];
        backdropImages = backdropsData.map((backdrop, idx) => {
            const {aspect_ratio, file_path} = backdrop;
            const height = parseInt(windowWidth / aspect_ratio, 0);
            const width = parseInt(windowWidth, 0);
            const path = file_path !== null
                ? getImageUrl(file_path)
                : `https://via.placeholder.com/${width}x${height}.png?text=${title}`;
            return (
                <img
                    key={idx + 1}
                    className={image}
                    height={height}
                    width='100%'
                    src={path}
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