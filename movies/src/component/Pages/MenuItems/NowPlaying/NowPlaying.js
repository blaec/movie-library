import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchNowPlaying} from "../../../../store/collection-actions";
import {isStringExist} from "../../../../utils/Utils";
import useGallery from "../../../../hooks/use-gallery";

const nowPlaying = () => {
    const tmdbApi = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isStringExist(tmdbApi)) {
            dispatch(fetchNowPlaying(tmdbApi));
        }
    }, [tmdbApi]);

    return useGallery("nowPlaying");
};

export default nowPlaying;