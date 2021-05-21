import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../../axios-movies";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../../utils/UrlUtils";
import * as actions from "../../../../store/actions";
import {feedbackActions} from "../../../../store/feedback";
import {collectionActions} from "../../../../store/collection";

const collection = () => {
    const movies = useSelector(state => state.collection.movies);
    const dispatch = useDispatch();
    const onMoviesChange = (movies) => dispatch(collectionActions.setMoviesCollection(movies));
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(movieApi.get.getAllMovies)
            .then(response => {
                const {data} = response;
                onMoviesChange(data)
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Found ${data.length} movies`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                onSetSnackbar({open: true, message: `To load movies`, type: 'error'})
            });
    }, []);

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