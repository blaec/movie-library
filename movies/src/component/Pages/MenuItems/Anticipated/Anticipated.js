import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {isStringExist} from "../../../../utils/Utils";
import {fetchAnticipated} from "../../../../store/collection-actions";
import useGallery from "../../../../hooks/use-gallery";

const anticipated = () => {
    const tmdbApi = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isStringExist(tmdbApi)) {
            dispatch(fetchAnticipated(tmdbApi));
        }
    }, [tmdbApi]);

    return useGallery("anticipated");
};

export default anticipated;