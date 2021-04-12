import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {useSelector} from "react-redux";

import Gallery from "../../Gallery/Gallery/Gallery";
import MyLoader from "../../../UI/Spinners/MyLoader";
import {movieApi} from "../../../utils/UrlUtils";

const filteredCollection = () => {
    const genreIds = useSelector(state => state.genreIds);

    const [filteredMovies, setFilteredMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.post(movieApi.get.getAllByGenres, genreIds)
            .then(response => {
                setFilteredMovies(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);


    let gallery = <MyLoader/>;
    if (!isLoading) {
        gallery = <Gallery movies={filteredMovies}/>
    }

    return (
        <React.Fragment>
            {gallery}
        </React.Fragment>
    );
};

export default filteredCollection;