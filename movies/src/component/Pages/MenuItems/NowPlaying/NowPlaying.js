import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchNowPlaying} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {collectionActions} from "../../../../store/state/collection/collection-slice";

const nowPlaying = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasTmdbApi) {
            dispatch(collectionActions.resetNowPlaying());
            for (let page = 1; page < 15; page++) {
                dispatch(fetchNowPlaying(tmdbApi, page));
            }
        }
    }, [tmdbApi]);

    return useGallery("nowPlaying");
};

export default nowPlaying;