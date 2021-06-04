import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {isArrayExist} from "../utils/Utils";
import {feedbackActions} from "../store/feedback-slice";
import MyLoader from "../UI/Spinners/MyLoader";
import Gallery from "../component/Gallery/Gallery/Gallery";
import {useSnackbar} from "notistack";
import {Grow, Zoom} from "@material-ui/core";

const useGallery = (movies) => {
    const collection = useSelector(state => state.collection[movies]);
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const hasMovies = isArrayExist(collection);
    useEffect(() => {
        if (hasMovies) {
            enqueueSnackbar(`Found ${collection.length} movies`, {variant: 'info'});
            // dispatch(feedbackActions.setSnackbar({
            //     open: true,
            //     message: `Found ${collection.length} movies`,
            //     type: 'success'
            // }));
        }
    }, [hasMovies])
    return (
        <React.Fragment>
            {!hasMovies && <MyLoader/>}
            {hasMovies && <Gallery movies={collection}/>}
        </React.Fragment>
    );
};

export default useGallery;