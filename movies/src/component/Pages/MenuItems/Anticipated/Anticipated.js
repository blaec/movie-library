import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAnticipated} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {collectionActions} from "../../../../store/state/collection/collection-slice";

const anticipated = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasTmdbApi) {
            dispatch(collectionActions.resetAnticipated());
            for (let page = 1; page < 15; page++) {
                dispatch(fetchAnticipated(tmdbApi, page));
            }
        }
    }, [tmdbApi]);

    return useGallery("anticipated");
};

export default anticipated;