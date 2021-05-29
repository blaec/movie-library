import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

import {
    fullTitle,
    isArrayExist,
    isObjectsExist,
    isStringExist,
    isStringsExist,
    joinNames
} from "../../../../utils/Utils";
import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import MyLoader from "../../../../UI/Spinners/MyLoader";
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

const movieDetails = (props) => {
    const params = useParams();
    const {movieId} = params;
    const {root} = useStyles();

    const tmdbApi = useSelector(state => state.api.tmdb);
    const omdbApi = useSelector(state => state.api.omdb);
    const cast = useSelector(state => state.details.cast);
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const omdbMovieDetails = useSelector(state => state.details.movieOmdbDetails);
    const imdbId = useSelector(state => state.details.imdbId);
    const dispatch = useDispatch();

    const handleBack = () => {
        localStorage.removeItem('id');
        props.history.goBack();

        // reset all states
        dispatch(detailsActions.setCast([]));
        dispatch(detailsActions.setMovieTmdbDetails({}));
        dispatch(detailsActions.setMovieOmdbDetails({}));
        dispatch(detailsActions.setImdbId(''));
    };

    useEffect(() => {
        if (isStringsExist(movieId, tmdbApi)) {
            dispatch(fetchMovieTmdbDetails(movieId, tmdbApi));
        }
    }, [movieId, tmdbApi]);

    useEffect(() => {
        if (isStringExist(imdbId)) {
            dispatch(fetchMovieOmdbDetails(imdbId, omdbApi));
        }
    }, [imdbId])

    useEffect(() => {
        if (isStringsExist(movieId, tmdbApi)) {
            dispatch(fetchCast(movieId, tmdbApi));
        }
    }, [movieId, tmdbApi]);

    const hasDetails = isObjectsExist(tmdbMovieDetails, omdbMovieDetails) && isArrayExist(cast);
    let details = <MyLoader/>
    if (hasDetails) {
        const {title, releaseDate, genres, images: {backdrops}} = tmdbMovieDetails || {};
        const id = localStorage.getItem('id');
        details = (
            <div className={root}>
                <BackdropImage
                    backdrops={backdrops}
                    alt={`${fullTitle(title, releaseDate)}`}
                    id={id}
                    onClose={handleBack}
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