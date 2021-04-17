import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {getActorDetailsUrl} from "../../../utils/UrlUtils";
import {useSelector} from "react-redux";

const actorDetails = (props) => {
    const {id} = props;

    const configs = useSelector(state => state.api);
    const [actorMovies, setActorMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(getActorDetailsUrl(id, configs.tmdbApi))
            .then(response => {
                setActorMovies(response.data.credits.cast);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let allMovies = null;
    if (!isLoading) {
        console.log(actorMovies);
        allMovies = <div>{actorMovies[0].character}</div>;
    }

    return (
        <div>
            {allMovies}
        </div>
    );
};

export default actorDetails;