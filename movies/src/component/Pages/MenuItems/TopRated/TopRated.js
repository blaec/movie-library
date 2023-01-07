import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchTopRated} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {collectionActions} from "../../../../store/state/collection/collection-slice";
import {infoPage} from "../../../../store/localStorage/actions";


const topRated = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        let pageLimit = infoPage.get() || 1;
        if (hasTmdbApi) {
            dispatch(collectionActions.resetTopRated());
            for (let page = 1; page <= pageLimit; page++) {
                dispatch(fetchTopRated(tmdbApi, page));
            }
        }
    }, [tmdbApi]);

    return useGallery("topRated");
};

export default topRated;