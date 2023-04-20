import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchNowPlaying} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {infiniteLoadPage} from "../../../../store/localStorage/actions";

const nowPlaying = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasTmdbApi) {
            infiniteLoadPage.set(1);
            dispatch(fetchNowPlaying(tmdbApi));
        }
    }, [tmdbApi]);

    return useGallery("nowPlaying");
};

export default nowPlaying;