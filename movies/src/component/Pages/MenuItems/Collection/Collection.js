import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {isArrayEmpty} from "../../../../utils/Utils";
import {feedbackActions} from "../../../../store/feedback-slice";

const collection = () => {
    const movies = useSelector(state => state.collection.movies);
    const dispatch = useDispatch();

    const hasMovies = !isArrayEmpty(movies);
    useEffect(() => {
        if (hasMovies) {
            dispatch(feedbackActions.setSnackbar({
                open: true,
                message: `Found ${movies.length} movies`,
                type: 'success'
            }));
        }
    }, [hasMovies])
    return (
        <React.Fragment>
            {!hasMovies && <MyLoader/>}
            {hasMovies && <Gallery movies={movies}/>}
        </React.Fragment>
    );
};

export default collection;