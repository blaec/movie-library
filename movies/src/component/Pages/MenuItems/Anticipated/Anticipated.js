import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAnticipated} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {infiniteLoadPage} from "../../../../store/localStorage/actions";

const anticipated = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasTmdbApi) {
            infiniteLoadPage.set(1);
            dispatch(fetchAnticipated(tmdbApi));
        }
    }, [tmdbApi]);

    return useGallery("anticipated");
};

export default anticipated;