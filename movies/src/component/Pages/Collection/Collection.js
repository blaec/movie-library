import React, {useEffect, useState} from 'react';
import Gallery from "../../Gallery/Gallery/Gallery";
import axios from "../../../axios-movies";
import MyLoader from "../../../UI/Spinners/MyLoader";
import * as actions from "../../../store/actions";
import {useDispatch} from "react-redux";

const collection = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const onMoviesChange = (movies) => dispatch(actions.setMovies(movies));

    useEffect(() => {
        console.log("load movies");
        setIsLoading(true);
        axios.get("/movies/gallery")
            .then(response => {
                console.log("loaded movies");
                onMoviesChange(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let gallery = <MyLoader/>;
    if (!isLoading) {
        gallery = <Gallery/>
    }

    return (
        <React.Fragment>
            {gallery}
        </React.Fragment>
    );
};

export default collection;