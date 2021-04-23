import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {useSelector} from "react-redux";

import Gallery from "../../Gallery/Gallery/Gallery";
import MyLoader from "../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../utils/UrlUtils";
import MySnackbar, {initialSnackBarState} from "../../../UI/MySnackbar";

const filteredCollection = () => {
    const genreIds = useSelector(state => state.genreIds);

    const [filteredMovies, setFilteredMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [snackbarProps, setSnackbarProps] = useState(initialSnackBarState);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps(initialSnackBarState);
    };

    useEffect(() => {
        setIsLoading(true);
        axios.post(movieApi.get.getAllByGenres, genreIds)
            .then(response => {
                const {data} = response;
                setFilteredMovies(data);
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Found ${data.length} movies`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setSnackbarProps({open: true, message: `To load movies`, type: 'error'})
            });
    }, []);


    let gallery = <MyLoader/>;
    if (!isLoading) {
        gallery = <Gallery movies={filteredMovies} isCollection={false}/>
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

export default filteredCollection;