import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios-movies";

import Gallery from "../../Gallery/Gallery/Gallery";
import MyLoader from "../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../utils/UrlUtils";
import * as actions from "../../../store/actions";
import MySnackbar, {initialSnackBarState} from "../../../UI/MySnackbar";

const collection = () => {
    const movies = useSelector(state => state.movies);
    const dispatch = useDispatch();
    const onMoviesChange = (movies) => dispatch(actions.setMovies(movies));

    const [snackbarProps, setSnackbarProps] = useState(initialSnackBarState);
    const [isLoading, setIsLoading] = useState(true);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps(initialSnackBarState);
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get(movieApi.get.getAllMovies)
            .then(response => {
                onMoviesChange(response.data)
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Found ${response.data.length} movies`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setSnackbarProps({open: true, message: `To load movies`, type: 'error'})
            });
    }, []);

    let gallery = <MyLoader/>;
    if (!isLoading) {
        gallery = <Gallery movies={movies}/>
    }
    let snackbar = null;
    if (snackbarProps.open) {
        snackbar = <MySnackbar {...snackbarProps}
                               onClose={handleSnackbarClose}/>;
    }

    return (
        <React.Fragment>
            {gallery}
            {snackbar}
        </React.Fragment>
    );
};

export default collection;