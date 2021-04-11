import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios-movies";

import Gallery from "../../Gallery/Gallery/Gallery";
import MyLoader from "../../../UI/Spinners/MyLoader";
import {javaApi} from "../../../utils/UrlUtils";
import * as actions from "../../../store/actions";

const wishlist = () => {
    const movies = useSelector(state => state.movies);
    const dispatch = useDispatch();
    const onMoviesChange = (movies) => dispatch(actions.setMovies(movies));

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("load movies from wishlist");
        setIsLoading(true);
        axios.get(javaApi.getAllWishMovies)
            .then(response => {
                console.log("loaded movies from wishlist");
                onMoviesChange(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let wishList = <MyLoader/>;
    if (!isLoading) {
        wishList = <Gallery movies={movies}/>
    }

    return (
        <React.Fragment>
            {wishList}
        </React.Fragment>
    );
};

export default wishlist;