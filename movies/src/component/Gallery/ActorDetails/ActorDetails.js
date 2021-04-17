import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {getActorDetailsUrl} from "../../../utils/UrlUtils";
import {useSelector} from "react-redux";
import ActorMovie from "./ActorMovie";
import {Box, List} from "@material-ui/core";

const actorDetails = (props) => {
    const {id} = props;

    const configs = useSelector(state => state.api);
    const [actorMovies, setActorMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(getActorDetailsUrl(id, configs.tmdbApi))
            .then(response => {
                setActorMovies(response.data);
                console.log(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let allMovies = null;
    if (!isLoading) {
        allMovies =
            <React.Fragment>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    {actorMovies.name}
                </Box>
                {actorMovies.credits.cast.map(movie => <ActorMovie key={movie.id} {...movie}/>)}
            </React.Fragment>
    }

    return (
        <List>
            {allMovies}
        </List>
    );
};

export default actorDetails;