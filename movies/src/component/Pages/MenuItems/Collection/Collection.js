import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../../axios-movies";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../../utils/UrlUtils";
import {feedbackActions} from "../../../../store/feedback-slice";
import {collectionActions} from "../../../../store/collection-slice";
import {fetchMovies} from "../../../../store/collection-actions";

const collection = () => {
    const movies = useSelector(state => state.collection.movies);
    const dispatch = useDispatch();
    const onMoviesChange = (movies) => dispatch(collectionActions.setMoviesCollection(movies));
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    const [isLoading, setIsLoading] = useState(false);

    let gallery = <MyLoader/>;
    if (!isLoading) {
        gallery = <Gallery movies={movies}/>
    }

    return (
        <React.Fragment>
            {gallery}
        </React.Fragment>
    );
};

export default collection;