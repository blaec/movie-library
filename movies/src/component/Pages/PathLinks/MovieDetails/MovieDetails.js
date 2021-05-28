import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../../axios-movies";

import {getMovieDetailsUrl, getOmdbMovieDetails} from "../../../../utils/UrlUtils";
import {fullTitle, isArrayEmpty, isObjectEmpty, joinNames} from "../../../../utils/Utils";
import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {feedbackActions} from "../../../../store/feedback-slice";
import {deleteMovie} from "../../../../store/collection-actions";
import {uploadActions} from "../../../../store/upload-slice";
import {snackbarAutoHideDuration} from "../../../../utils/Constants";

import {makeStyles} from "@material-ui/core/styles";
import {fetchCast} from "../../../../store/details-actions";
import {detailsActions} from "../../../../store/details-slice";

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
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    const [movieDetails, setMovieDetails] = useState();
    const [omdbMovieDetails, setOmdbMovieDetails] = useState();
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);

    const handleBack = () => {
        localStorage.removeItem('id');
        props.history.goBack();
        dispatch(detailsActions.setCast([]));
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
        setIsLoadingMovies(true);
        axios.get(getMovieDetailsUrl(movieId, tmdbApi))
            .then(response => {
                const {data} = response;
                const {imdb_id} = data;

                setMovieDetails(data);

                // Get movie additional details from omdb
                axios.get(getOmdbMovieDetails(imdb_id, omdbApi))
                    .then(response => {
                        const {data} = response;
                        setOmdbMovieDetails(data);
                        setIsLoadingMovies(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsLoadingMovies(false);
                    });

            })
            .catch(error => {
                console.log(error);
                setIsLoadingMovies(false);
            });
    }, [movieId, tmdbApi]);

    useEffect(() => {
        dispatch(fetchCast(movieId, tmdbApi));
    }, [movieId, tmdbApi]);

    const hasCast = !isArrayEmpty(cast);
    let details = <MyLoader/>
    if (!isLoadingMovies && hasCast) {
        const {title, releaseDate, genres, images: {backdrops}} = movieDetails || {};
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
                    tmdbDetails={movieDetails}
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