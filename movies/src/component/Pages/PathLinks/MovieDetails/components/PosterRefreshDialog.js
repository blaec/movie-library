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
import {useParams} from "react-router";

const useStyles = makeStyles((theme) => ({
    images: {
        display: 'flex',
        overflow: 'auto',
        marginTop: theme.spacing(2),
    },
    selected: {
        opacity: '50%',
    }
}));

const posterRefreshDialog = (props) => {
    const {open, onExit, onDelete} = props;
    const {t} = useTranslation('common');
    const {movieTmdbId} = useParams();
    const {images, selected} = useStyles();

    const postersEn = useSelector(state => state.collection.postersEn);
    const postersRu = useSelector(state => state.collection.postersRu);
    const movies = useSelector(state => state.collection.movies);
    // const wishlist = useSelector(state => state.collection.wishlist);
    // const currentMovies = movies === undefined ? wishlist : movies;

    let posterEnGallery = null;
    if (isArraysExist(postersEn, movies)) {
        const {posterPath} = movies.filter(movie => movie.tmdbId === movieTmdbId)[0];
        // const movie = currentMovies !== undefined
        //     ? currentMovies.filter(movie => movie.tmdbId === movieTmdbId)[0]
        //     : {};
        // const {posterPath} = {};
        posterEnGallery = postersEn.map((image, index) => {
            const {file_path} = image;
            return (
                <img
                    className={file_path !== posterPath ? selected : null}
                    key={index}
                    height={250}
                    src={getImageUrl(file_path, posterSizes.w342)}
                    alt=''
                />
            )
        });
    }

    let posterRuGallery = null;
    if (isArraysExist(postersRu, movies)) {
        const {posterPathRu} = movies.filter(movie => movie.tmdbId === movieTmdbId)[0];
        // const movie = currentMovies !== undefined
        //     ? currentMovies.filter(movie => movie.tmdbId === movieTmdbId)[0]
        //     : {};
        // const {posterPathRu} = movie;
        posterRuGallery = postersRu.map((image, index) => {
            const {file_path} = image;
            return (
                <img
                    className={file_path !== posterPathRu ? selected : null}
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