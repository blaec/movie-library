import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {isArrayExist} from "../utils/Utils";
import MyLoader from "../UI/Spinners/MyLoader";
import Gallery from "../component/Gallery/Gallery/Gallery";
import {feedbackActions} from "../store/state/feedback/feedback-slice";
import {useTranslation} from "react-i18next";
import MyResponse from "../UI/MyResponse";


const useGallery = (movies) => {
    const [isNotified, setIsNotified] = useState(false);
    const {collectionItems, isCollectionItemsLoaded} = useSelector(state => state.collection[movies]);
    const dispatch = useDispatch();
    const {t} = useTranslation('common');

    useEffect(() => {
        let isShowSnackbar = isCollectionItemsLoaded && !isNotified;
        if (isShowSnackbar) {
            dispatch(feedbackActions.setSnackbar({
                message: `${t('snackbar.foundMovies', {count: collectionItems.length})}`,
                type: 'info'
            }));
            setIsNotified(true);
        }
    }, [collectionItems]);

    const isLoadedEmptyData = isCollectionItemsLoaded && !isArrayExist(collectionItems);
    const isLoadedCompleteData = isCollectionItemsLoaded && isArrayExist(collectionItems);
    return (
        <React.Fragment>
            {!isCollectionItemsLoaded && <MyLoader/>}
            {isLoadedEmptyData && <MyResponse message={t('snackbar.noResult')}/>}
            {isLoadedCompleteData && <Gallery movies={collectionItems}/>}
        </React.Fragment>
    );
};

export default useGallery;