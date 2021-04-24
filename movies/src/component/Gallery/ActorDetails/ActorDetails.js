import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {useSelector} from "react-redux";

import ActorMovie from "./ActorMovie";
import {getActorDetailsUrl} from "../../../utils/UrlUtils";
import MyLoader from "../../../UI/Spinners/MyLoader";
import '../Gallery/Gallery.css';
import '../Details/Details.css';

import {Box, List, makeStyles} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
    actor: {
        paddingLeft: theme.spacing(7),
        marginTop: 8,
    },
    sticky: {
        marginTop: -10,
        zIndex: 2,
        position: 'fixed',
        backgroundColor: 'lightgrey',
        width: '100%',
        height: 45,
    },
    movieItems: {
        marginTop: 40,
    }
}));

const actorDetails = (props) => {
    const {id, onClose} = props;
    const {sticky, actor, movieItems} = useStyles();

    const movies = useSelector(state => state.movies);
    const {tmdbApi} = useSelector(state => state.api);
    const [actorMovies, setActorMovies] = useState();
    const [moviesIds, setMoviesIds] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(getActorDetailsUrl(id, tmdbApi))
            .then(response => {
                const {data} = response;
                setActorMovies(data);
                setMoviesIds(movies.map(movie => +movie.tmdbId));
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let allMovies = <MyLoader/>;
    if (!isLoading) {
        const {name, credits} = actorMovies;
        const {cast} = credits;
        allMovies =
            <React.Fragment>
                <div className={sticky}>
                    <ArrowBackIcon onClick={onClose}
                                   className="ImageBack"
                                   fontSize="large"/>
                    <Box className={actor}
                         fontSize="h6.fontSize"
                         fontWeight="fontWeightBold">
                        {name}
                    </Box>
                </div>
                <div className={movieItems}>
                    {cast.filter(movie => movie.release_date !== undefined && movie.release_date !== "")
                         .sort((a, b) => (new Date(a.release_date) < new Date(b.release_date) ? 1 : -1))
                         .map(movie => <ActorMovie key={movie.id}
                                                   {...movie}
                                                   exist={moviesIds ? moviesIds.includes(movie.id) : false}/>)}
                </div>
            </React.Fragment>
    }

    return (
        <div className="Details">
            <List>
                {allMovies}
            </List>
        </div>
    );
};

export default actorDetails;