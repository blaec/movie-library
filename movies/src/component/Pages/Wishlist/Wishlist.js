import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";

import Gallery from "../../Gallery/Gallery/Gallery";
import MyLoader from "../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../utils/UrlUtils";
import MySnackbar, {initialSnackBarState} from "../../../UI/MySnackbar";

const wishlist = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [wishMovies, setWishMovies] = useState();
    const [snackbarProps, setSnackbarProps] = useState(initialSnackBarState);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps(initialSnackBarState);
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get(movieApi.get.getAllWishMovies)
            .then(response => {
                const {data} = response;
                setWishMovies(data)
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Found ${data.length} movies`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setSnackbarProps({open: true, message: `To load movies`, type: 'error'})
            });
    }, []);

    let wishList = <MyLoader/>;
    if (!isLoading) {
        wishList = <Gallery movies={wishMovies} isCollection={false}/>
    }
    let snackbar = null;
    if (snackbarProps.open) {
        snackbar = <MySnackbar {...snackbarProps}
                               onClose={handleSnackbarClose}/>;
    }

    return (
        <React.Fragment>
            {wishList}
            {snackbar}
        </React.Fragment>
    );
};

export default wishlist;