import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {isArraysExist, isStringsExist} from "../../../../../../../utils/Utils";
import {fetchTrailers} from "../../../../../../../store/state/details/details-actions";

import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflow: 'auto',
    },
}));


const trailers = () => {
    const {movieTmdbId} = useParams();
    const {root} = useStyles();

    const tmdbApi = useSelector(state => state.api.tmdb);
    const trailers = useSelector(state => state.details.trailers);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isStringsExist(movieTmdbId, tmdbApi)) {
            dispatch(fetchTrailers(movieTmdbId, tmdbApi));
        }
    }, [movieTmdbId, tmdbApi]);

    let trailerVideos = null;
    if (isArraysExist(trailers)) {
        trailerVideos = trailers.map((trailer, index) => {
            const {key, name} = trailer;
            return (
                <iframe
                    key={index}
                    src={`https://www.youtube.com/embed/${key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={name}
                />
            )
        });
    }

    return (
        <Paper className={root}>
            {trailerVideos}
        </Paper>
    );
};

export default trailers;