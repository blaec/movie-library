import React, {useEffect, Suspense} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import MyResponse from "../../../../UI/MyResponse";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {fetchFilteredCollection} from "../../../../store/state/collection/collection-actions";
import {isArrayExist} from "../../../../utils/Utils";
import {feedbackActions} from "../../../../store/state/feedback/feedback-slice";

const filteredCollection = () => {
    const params = useParams();
    const {genreIds} = params;

    const {data: filteredMovies, hasResult} = useSelector(state => state.collection.filteredMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilteredCollection(genreIds));
    }, [genreIds]);

    let hasMovies = hasResult && isArrayExist(filteredMovies);
    useEffect(() => {
        if (hasMovies) {
            dispatch(feedbackActions.setSnackbar({
                message: `Found ${filteredMovies.length} movies`,
                type: 'info'
            }));
        }
    }, [hasMovies]);

    return (
        <Suspense fallback={<MyLoader/>}>
            {hasResult && !hasMovies &&  <MyResponse message="Nothing matched the request!"/>}
            {hasMovies &&  <Gallery movies={filteredMovies}/>}
        </Suspense>
    );
};

export default filteredCollection;