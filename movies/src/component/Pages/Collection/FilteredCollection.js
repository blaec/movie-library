import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import Gallery from "../../Gallery/Gallery/Gallery";
import {useSelector} from "react-redux";
import MyLoader from "../../../UI/Spinners/MyLoader";

const filteredCollection = () => {
    const [filteredMovies, setFilteredMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const genreIds = useSelector(state => state.genreIds);

    useEffect(() => {
        setIsLoading(true);
        axios.post("/movies/filter", genreIds)
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