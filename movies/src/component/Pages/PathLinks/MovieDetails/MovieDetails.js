import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fullTitle, isArrayEmpty, isObjectEmpty, isStringEmpty, joinNames} from "../../../../utils/Utils";
import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {feedbackActions} from "../../../../store/feedback-slice";
import {deleteMovie} from "../../../../store/collection-actions";
import {uploadActions} from "../../../../store/upload-slice";
import {snackbarAutoHideDuration} from "../../../../utils/Constants";
import {fetchCast, fetchMovieOmdbDetails, fetchMovieTmdbDetails} from "../../../../store/details-actions";
import {detailsActions} from "../../../../store/details-slice";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        [`@media (orientation:landscape)`]: {
            margin: '0 10%',
        },
        [`${theme.breakpoints.up(1000)} and (orientation:landscape)`]: {
            margin: '0 25%',
        },
        backgroundColor: '#3f51b50f',
    },
}));

// TODO refactor multiple axios get requests
const movieDetails = (props) => {
    const {match: {params: {movieId}}} = props;
    const {root} = useStyles();

    const tmdbApi = useSelector(state => state.api.tmdb);
    const omdbApi = useSelector(state => state.api.omdb);
    const saveResult = useSelector(state => state.upload.result);
    const cast = useSelector(state => state.details.cast);
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const omdbMovieDetails = useSelector(state => state.details.movieOmdbDetails);
    const imdbId = useSelector(state => state.details.imdbId);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    const handleBack = () => {
        localStorage.removeItem('id');
        props.history.goBack();

        // reset all states
        dispatch(detailsActions.setCast([]));
        dispatch(detailsActions.setMovieTmdbDetails({}));
        dispatch(detailsActions.setMovieOmdbDetails({}));
        dispatch(detailsActions.setImdbId(''));
    };

    const handleDeleteMovie = (id) => {
        dispatch(deleteMovie(id));
        const timeout = setTimeout(() => {
            handleBack();
        }, snackbarAutoHideDuration / 3);

        return () => {
            clearTimeout(timeout);
        };
    };

    useEffect(() => {
        if (!isObjectEmpty(saveResult)) {
            const {message, success} = saveResult;
            const type = success ? 'success' : 'error';
            onSetSnackbar({open: true, message: `${message}`, type: type});
            dispatch(uploadActions.setResult({}));
        }
    }, [saveResult])

    useEffect(() => {
        if (!isStringEmpty(movieId) && !isStringEmpty(tmdbApi)) {
            dispatch(fetchMovieTmdbDetails(movieId, tmdbApi));
        }
    }, [movieId, tmdbApi]);

    useEffect(() => {
        if (!isStringEmpty(imdbId)) {
            dispatch(fetchMovieOmdbDetails(imdbId, omdbApi));
        }
    }, [imdbId])

    useEffect(() => {
        if (!isStringEmpty(movieId) && !isStringEmpty(tmdbApi)) {
            dispatch(fetchCast(movieId, tmdbApi));
        }
    }, [movieId, tmdbApi]);

    const hasCast = !isArrayEmpty(cast);
    const hasMovieDetails = !isObjectEmpty(tmdbMovieDetails) && !isObjectEmpty(omdbMovieDetails);
    let details = <MyLoader/>
    if (hasMovieDetails && hasCast) {
        const {title, releaseDate, genres, images: {backdrops}} = tmdbMovieDetails || {};
        const id = localStorage.getItem('id');
        details = (
            <div className={root}>
                <BackdropImage
                    backdrops={backdrops}
                    alt={`${fullTitle(title, releaseDate)}`}
                    id={id}
                    onClose={handleBack}
                    onDelete={handleDeleteMovie}
                />
                <Info
                    tmdbDetails={tmdbMovieDetails}
                    omdbDetails={omdbMovieDetails}
                    castDetails={cast}
                    genreDetails={joinNames(genres)}
                />
            </div>
        );
    }

    return (
        <React.Fragment>
            {details}
        </React.Fragment>
    );
};

export default movieDetails;