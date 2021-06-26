import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {isArraysExist, isStringsExist} from "../../../../../../../utils/Utils";
import {fetchTrailers} from "../../../../../../../store/state/details/details-actions";

const trailers = () => {
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
                    width="360"
                    height="270"
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
            {trailerVideos}
        </React.Fragment>
    );
};

export default trailers;