import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAnticipated} from "../../../../store/state/collection/collection-actions";
import useGallery from "../../../../hooks/use-gallery";
import {collectionActions} from "../../../../store/state/collection/collection-slice";
import {infoPage} from "../../../../store/localStorage/actions";

const anticipated = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        let pageLimit = infoPage.get() || 1;
        if (hasTmdbApi) {
            dispatch(collectionActions.resetAnticipated());
            for (let page = 1; page <= pageLimit; page++) {
                dispatch(fetchAnticipated(tmdbApi, page));
            }
        }
    }, [tmdbApi]);

    return useGallery("anticipated");
};

export default anticipated;