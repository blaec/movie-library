import React, {useEffect} from 'react';

import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {isArraysExist, isStringExist, isStringsExist} from "../../../../../../../utils/Utils";
import {fetchActorDetails, fetchCast, fetchTrailers} from "../../../../../../../store/state/details/details-actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

const useStyles = makeStyles((theme) => ({
    taglineFont: {
        fontWeight: 700,
        fontFamily: ['Caveat', "!important"],
        textAlign: 'right',
        margin: theme.spacing(0, 0, 1, '20%'),
    },
}));

const description = (props) => {
    const {details: {tagline, overview, Plot}} = props;
    const {taglineFont} = useStyles();
    const {movieTmdbId} = useParams();

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
        trailerVideos = trailers.map(trailer => {
            const {key} = trailer;
            return (
                <iframe
                    width="100%"
                    height="480"
                    src={`https://www.youtube.com/embed/${key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            )
        });
    }

    return (
        <React.Fragment>
            <Typography
                className={taglineFont}
                variant='h5'
            >
                {tagline}
            </Typography>
            <Typography variant='body1'>
                {overview || Plot || `No description available`}
            </Typography>
            {trailerVideos}
        </React.Fragment>
    );
};

export default description;