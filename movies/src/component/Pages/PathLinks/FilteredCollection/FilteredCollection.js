import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {fetchFilteredCollection} from "../../../../store/collection-actions";
import {isArrayExist} from "../../../../utils/Utils";
import {feedbackActions} from "../../../../store/feedback-slice";

const filteredCollection = () => {
    const params = useParams();
    const {genreIds} = params;

    const filteredMovies = useSelector(state => state.collection.filteredMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilteredCollection(genreIds));
    }, [genreIds]);

    let hasMovies = isArrayExist(filteredMovies);
    useEffect(() => {
        if (hasMovies) {
            dispatch(feedbackActions.setSnackbar({
                message: `Found ${filteredMovies.length} movies`,
                type: 'success'
            }));
        }
    }, [hasMovies])
    return (
        <React.Fragment>
            {!hasMovies &&  <MyLoader/>}
            {hasMovies &&  <Gallery movies={filteredMovies}/>}
        </React.Fragment>
    );
};

export default filteredCollection;