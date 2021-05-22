import React, {useEffect, useState} from 'react';
import axios from "../../../../axios-movies";
import {useDispatch, useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../../utils/UrlUtils";
import {feedbackActions} from "../../../../store/feedback-slice";
import {collectionActions} from "../../../../store/collection-slice";

const wishlist = () => {
    const wishMovies = useSelector(state => state.collection.wishlist);
    const dispatch = useDispatch();
    const onWishMoviesChange = (movies) => dispatch(collectionActions.setWishlistCollection(movies));
    const onSetSnackbar = (settings) => dispatch(feedbackActions.setSnackbar(settings));

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(movieApi.get.getAllWishMovies)
            .then(response => {
                const {data} = response;
                onWishMoviesChange(data)
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
        wishList = <Gallery movies={wishMovies}/>
    }

    return (
        <React.Fragment>
            {wishList}
        </React.Fragment>
    );
};

export default wishlist;