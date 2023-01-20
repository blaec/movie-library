import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchTopRated} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";


const topRated = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasTmdbApi) {
            dispatch(fetchTopRated(tmdbApi));
        }
    }, [tmdbApi]);

    return useGallery("topRated");
};

export default topRated;