import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MyArrowBack from "../../../../../UI/Buttons/Icons/MyArrowBack";
import MyDelete from "../../../../../UI/Buttons/Icons/MyDelete";
import MyWatch from "../../../../../UI/Buttons/Icons/MyWatch";
import {getImageUrl} from "../../../../../utils/UrlUtils";
import DeleteDialog from "./DeleteDialog";
import MyLoader from "../../../../../UI/Spinners/MyLoader";
import {drawer} from "../../../../../utils/Constants";
import {deleteMovie} from "../../../../../store/collection-actions";
import {fullTitle, getMovieById, isObjectExist} from "../../../../../utils/Utils";
import {uploadActions} from "../../../../../store/upload-slice";
import {feedbackActions} from "../../../../../store/feedback-slice";

import Carousel from "react-material-ui-carousel";
import {makeStyles} from "@material-ui/core/styles";
import {saveWishMovie} from "../../../../../store/upload-actions";

const TIMEOUT = 300;
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

    const saveResult = useSelector(state => state.upload.result);
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    let id = +localStorage.getItem('id');

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
        let watchMovie = {
            ...tmdbMovieDetails,
            genre_ids: tmdbMovieDetails.genres.map(genre => genre.id)
        };
        dispatch(saveWishMovie(watchMovie));
    };

    useEffect(() => {
        if (isObjectExist(saveResult)) {
            const {message, success} = saveResult;
            const type = success ? 'success' : 'error';
            onSetSnackbar({message: `${message}`, type: type});
            dispatch(uploadActions.setResult({}));
            onClose();
        }
    }, [saveResult])

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
                <MyDelete onDelete={handleDeletedMovie}/>
                <MyWatch onAddToWatch={handleAddToWatchMovie}/>
                <Carousel
                    timeout={TIMEOUT}
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