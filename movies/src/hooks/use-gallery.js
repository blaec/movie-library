import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {isArrayExist} from "../utils/Utils";
import MyLoader from "../UI/Spinners/MyLoader";
import Gallery from "../component/Gallery/Gallery/Gallery";
import {feedbackActions} from "../store/state/feedback/feedback-slice";
import {useTranslation} from "react-i18next";

const useGallery = (movies) => {
    const collection = useSelector(state => state.collection[movies]);
    const dispatch = useDispatch();
    const {t} = useTranslation('common');

    const hasMovies = isArrayExist(collection);
    useEffect(() => {
        if (hasMovies) {
            dispatch(feedbackActions.setSnackbar({
                message: `${t('snackbar.foundMovies', {length: collection.length})}`,
                type: 'info'
            }));
        }
    }, [hasMovies]);

    return (
        <React.Fragment>
            {!hasMovies && <MyLoader/>}
            {hasMovies && <Gallery movies={collection}/>}
        </React.Fragment>
    );
};

export default useGallery;