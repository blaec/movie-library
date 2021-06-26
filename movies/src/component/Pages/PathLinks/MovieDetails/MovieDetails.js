import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";

import {isStringExist, isStringsExist} from "../../../../utils/Utils";
import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import {fetchCast, fetchMovieOmdbDetails, fetchMovieTmdbDetails} from "../../../../store/state/details/details-actions";

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

const movieDetails = () => {
    const {movieTmdbId} = useParams();
    const history = useHistory();
    const {root} = useStyles();

    const tmdbApi = useSelector(state => state.api.tmdb);
    const omdbApi = useSelector(state => state.api.omdb);
    const imdbId = useSelector(state => state.details.imdbId);
    const dispatch = useDispatch();

    const handleBack = () => {
        history.goBack();
    };

    useEffect(() => {
        if (isStringsExist(movieTmdbId, tmdbApi)) {
            dispatch(fetchMovieTmdbDetails(movieTmdbId, tmdbApi));
        }
    }, [movieTmdbId, tmdbApi]);

    useEffect(() => {
        if (isStringExist(imdbId)) {
            dispatch(fetchMovieOmdbDetails(imdbId, omdbApi));
        }
    }, [imdbId])

    useEffect(() => {
        if (isStringsExist(movieTmdbId, tmdbApi)) {
            dispatch(fetchCast(movieTmdbId, tmdbApi));
        }
    }, [movieTmdbId, tmdbApi]);

    return (
        <div className={root}>
            <BackdropImage onClose={handleBack}/>
            <Info/>
        </div>
    );
};

export default movieDetails;