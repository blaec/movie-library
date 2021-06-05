import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";

import {isStringExist, isStringsExist} from "../../../../utils/Utils";
import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
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

const movieDetails = () => {
    const {movieId} = useParams();
    const history = useHistory();
    const {root} = useStyles();

    const tmdbApi = useSelector(state => state.api.tmdb);
    const omdbApi = useSelector(state => state.api.omdb);
    const imdbId = useSelector(state => state.details.imdbId);
    const dispatch = useDispatch();

    const handleBack = () => {
        localStorage.removeItem('id')
        history.goBack();
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

    return (
        <div className={root}>
            <BackdropImage onClose={handleBack}/>
            <Info/>
        </div>
    );
};

export default movieDetails;