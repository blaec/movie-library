import React, {useEffect, useState} from 'react';
import Gallery from "../../Gallery/Gallery/Gallery";
import axios from "../../../axios-movies";
import MyLoader from "../../../UI/Spinners/MyLoader";
import * as actions from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {javaApi} from "../../../utils/UrlUtils";

const collection = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const movies = useSelector(state => state.movies);
    const onMoviesChange = (movies) => dispatch(actions.setMovies(movies));

    useEffect(() => {
        console.log("load movies");
        setIsLoading(true);
        axios.get(javaApi.getAllMovies)
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
        gallery = <Gallery movies={movies}/>
    }

    return (
        <React.Fragment>
            {gallery}
        </React.Fragment>
    );
};

export default collection;