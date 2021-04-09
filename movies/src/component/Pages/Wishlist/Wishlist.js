import React, {useEffect, useState} from 'react';
import Gallery from "../../Gallery/Gallery/Gallery";
import {useDispatch} from "react-redux";
import * as actions from "../../../store/actions";
import axios from "../../../axios-movies";
import MyLoader from "../../../UI/Spinners/MyLoader";

const wishlist = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const onMoviesChange = (movies) => dispatch(actions.setMovies(movies));

    useEffect(() => {
        console.log("load movies from wishlist");
        setIsLoading(true);
        axios.get("/movies/wishlist")
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
        wishList = <Gallery/>
    }

    return (
        <React.Fragment>
            {wishList}
        </React.Fragment>
    );
};

export default wishlist;