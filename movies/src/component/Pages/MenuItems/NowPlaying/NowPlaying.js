import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchNowPlaying} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";

const nowPlaying = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasTmdbApi) {
            dispatch(fetchNowPlaying(tmdbApi));
        }
    }, [tmdbApi]);

    return useGallery("nowPlaying");
};

export default nowPlaying;