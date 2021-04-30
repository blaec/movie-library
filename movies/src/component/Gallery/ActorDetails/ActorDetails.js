import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {useSelector} from "react-redux";

import ActorMovie from "./ActorMovie";
import {getActorDetailsUrl} from "../../../utils/UrlUtils";
import MyLoader from "../../../UI/Spinners/MyLoader";
import MyArrowBack from "../../../UI/Buttons/Icons/MyArrowBack";

import {Box, List, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    actor: {
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(6),
    },
    sticky: {
        marginTop: -10,
        zIndex: 2,
        position: 'fixed',
        backgroundColor: '#5c6bc0',
        width: '100%',
        height: 45,
        color: 'white',
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
                    <MyArrowBack onClose={onClose}/>
                    <Typography className={actor}
                                variant="h6">
                        {name}
                    </Typography>
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
        <List>
            {allMovies}
        </List>
    );
};

export default actorDetails;