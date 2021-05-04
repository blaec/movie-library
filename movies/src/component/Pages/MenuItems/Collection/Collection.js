import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../../axios-movies";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../../utils/UrlUtils";
import * as actions from "../../../../store/actions";

const collection = () => {
    const movies = useSelector(state => state.movies);
    const dispatch = useDispatch();
    const onMoviesChange = (movies) => dispatch(actions.setMovies(movies));
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

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
        gallery = <Gallery movies={movies} isCollection={true}/>
    }

    return (
        <React.Fragment>
            {gallery}
        </React.Fragment>
    );
};

export default collection;