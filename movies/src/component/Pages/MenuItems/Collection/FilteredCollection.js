import React, {useEffect, useState} from 'react';
import axios from "../../../../axios-movies";
import {useDispatch, useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../../utils/UrlUtils";
import * as actions from "../../../../store/actions";

const filteredCollection = () => {
    const genreIds = useSelector(state => state.genreIds);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

    const [filteredMovies, setFilteredMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.post(movieApi.get.getAllByGenres, genreIds)
            .then(response => {
                const {data} = response;
                setFilteredMovies(data);
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
        gallery = <Gallery movies={filteredMovies} isCollection={false}/>
    }

    return (
        <React.Fragment>
            {gallery}
        </React.Fragment>
    );
};

export default filteredCollection;