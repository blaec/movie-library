import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchTopRated} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {collectionActions} from "../../../../store/state/collection/collection-slice";


const topRated = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasTmdbApi) {
            dispatch(collectionActions.resetTopRated());
            for (let page = 1; page < 15; page++) {
                dispatch(fetchTopRated(tmdbApi, page));
            }
        }
    }, [tmdbApi]);

    return useGallery("topRated");
};

export default topRated;