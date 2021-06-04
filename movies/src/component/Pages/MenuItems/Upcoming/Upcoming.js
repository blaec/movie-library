import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isStringExist} from "../../../../utils/Utils";
import {fetchUpcoming} from "../../../../store/collection-actions";
import useGallery from "../../../../hooks/use-gallery";

const upcoming = () => {
    const tmdbApi = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isStringExist(tmdbApi)) {
            dispatch(fetchUpcoming(tmdbApi));
        }
    }, [tmdbApi]);

    return useGallery("upcoming");
};

export default upcoming;