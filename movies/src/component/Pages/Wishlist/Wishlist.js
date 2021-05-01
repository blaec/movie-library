import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {useDispatch} from "react-redux";

import Gallery from "../../Gallery/Gallery/Gallery";
import MyLoader from "../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../utils/UrlUtils";
import * as actions from "../../../store/actions";

const wishlist = () => {
    const dispatch = useDispatch();
    const onSetSnackbar = (settings) => dispatch(actions.setSnackbar(settings));

    const [isLoading, setIsLoading] = useState(true);
    const [wishMovies, setWishMovies] = useState();

    useEffect(() => {
        setIsLoading(true);
        axios.get(movieApi.get.getAllWishMovies)
            .then(response => {
                const {data} = response;
                setWishMovies(data)
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Found ${data.length} movies`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                onSetSnackbar({open: true, message: `To load movies`, type: 'error'})
            });
    }, []);

    let wishList = <MyLoader/>;
    if (!isLoading) {
        wishList = <Gallery movies={wishMovies} isCollection={false}/>
    }

    return (
        <React.Fragment>
            {wishList}
        </React.Fragment>
    );
};

export default wishlist;