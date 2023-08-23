import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchTopRated} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {infiniteLoadPage, language} from "../../../../store/localStorage/actions";


const topRated = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasTmdbApi) {
            infiniteLoadPage.set(1);
            dispatch(fetchTopRated(tmdbApi));
        }
    }, [tmdbApi, language.get()]);


    return useGallery("topRated");
};

export default topRated;