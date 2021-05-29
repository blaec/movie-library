import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import axios from "../../../../axios-movies";
import {getActorDetailsUrl} from "../../../../utils/UrlUtils";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import MyArrowBack from "../../../../UI/Buttons/Icons/MyArrowBack";
import ActorMovie from "./components/ActorMovie";
import {drawer} from "../../../../utils/Constants";
import {isArrayEmpty, isObjectEmpty, isStringEmpty} from "../../../../utils/Utils";

import {List, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [`@media (orientation:landscape)`]: {
            margin: '0 10%',
        },
        [`${theme.breakpoints.up(1000)} and (orientation:landscape)`]: {
            margin: '0 25%',
        },
        backgroundColor: '#3f51b50f',
    },
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
        [`@media (orientation:landscape)`]: {
            width: `calc(80% - ${drawer.width * .8}px)`,
        },
        [`${theme.breakpoints.up(1000)} and (orientation:landscape)`]: {
            width: `calc(50% - ${drawer.width * .5}px)`,
        },
    },
    movieItems: {
        marginTop: 40,
    }
}));

const actorMovies = (props) => {
    const {match: {params: {actorId}}} = props;
    const {root, sticky, actor, movieItems} = useStyles();

    const movies = useSelector(state => state.collection.movies);
    const tmdbApi = useSelector(state => state.api.tmdb);

    const [actorDetails, setActorDetails] = useState({});

    const handleBack = () => {
        props.history.goBack();
    };

    useEffect(() => {
        if (!isStringEmpty(tmdbApi) && !isArrayEmpty(movies)) {
            axios.get(getActorDetailsUrl(actorId, tmdbApi))
                .then(response => {
                    const {data} = response;
                    setActorDetails(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [tmdbApi, movies, actorId]);

    let hasData = !isObjectEmpty(actorDetails) && !isObjectEmpty(movies);
    let allMovies = <MyLoader/>;
    if (hasData) {
        const {name, credits} = actorDetails;
        const {cast} = credits;
        const farFuture = new Date((new Date()).getFullYear() + 10, 1, 1);
        const movieList = cast.filter(movie => {
            // skip 'Documentary' movies and movies without genres
            const {genre_ids} = movie;
            return !genre_ids.includes(99)
                && genre_ids.length !== 0;
        })
            .sort((a, b) => {
                const getDate = (movie) => {
                    const {release_date} = movie;
                    return (release_date === undefined || release_date === "")
                        ? farFuture
                        : release_date
                };
                return new Date(getDate(a)) < new Date(getDate(b)) ? 1 : -1;
            });


        let moviesIds = movies.map(movie => +movie.tmdbId);
        allMovies = (
            <React.Fragment>
                <div className={sticky}>
                    <MyArrowBack onClose={handleBack}/>
                    <Typography className={actor}
                                variant="h6">
                        {`${name} (${movieList.length})`}
                    </Typography>
                </div>
                <div className={movieItems}>
                    {movieList.map(movie =>
                        <ActorMovie key={movie.id}
                                    {...movie}
                                    exist={moviesIds.includes(movie.id)}/>)
                    }
                </div>
            </React.Fragment>
        );
    }

    return (
        <List className={root}>
            {allMovies}
        </List>
    );
};

export default actorMovies;