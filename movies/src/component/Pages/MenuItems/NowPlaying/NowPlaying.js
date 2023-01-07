import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchNowPlaying} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {collectionActions} from "../../../../store/state/collection/collection-slice";
import {infoPage} from "../../../../store/localStorage/actions";

const nowPlaying = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        let pageLimit = infoPage.get() || 1;
        if (hasTmdbApi) {
            dispatch(collectionActions.resetNowPlaying());
            for (let page = 1; page <= pageLimit; page++) {
                dispatch(fetchNowPlaying(tmdbApi, page));
            }
        }
    }, [tmdbApi]);

    return useGallery("nowPlaying");
};

export default nowPlaying;