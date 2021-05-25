import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {isObjectEmpty} from "../../../../utils/Utils";
import {feedbackActions} from "../../../../store/feedback-slice";

const wishlist = () => {
    const wishMovies = useSelector(state => state.collection.wishlist);
    const dispatch = useDispatch();

    const hasMovies = !isObjectEmpty(wishMovies);
    if (hasMovies) {
        dispatch(feedbackActions.setSnackbar({
            open: true,
            message: `Found ${wishMovies.length} movies`,
            type: 'success'
        }));
    }
    return (
        <React.Fragment>
            {!hasMovies && <MyLoader/>}
            {hasMovies && <Gallery movies={wishMovies}/>}
        </React.Fragment>
    );
};

export default wishlist;