import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "../../../../axios-movies";
import {getActorDetailsUrl} from "../../../../utils/UrlUtils";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import MyArrowBack from "../../../../UI/Buttons/Icons/MyArrowBack";
import {List, makeStyles, Typography} from "@material-ui/core";
import ActorMovie from "./components/ActorMovie";
import {drawer} from "../../../../utils/Constants";

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
            width: `calc(50% - ${drawer.width *.5}px)`,
        },
    },
    movieItems: {
        marginTop: 40,
    }
}));

const actorMovies = (props) => {
    const {match : {params : {actorId}}} = props;
    const {root, sticky, actor, movieItems} = useStyles();

    const movies = useSelector(state => state.movies);
    const {tmdbApi} = useSelector(state => state.api);
    const [actorMovies, setActorMovies] = useState();
    const [moviesIds, setMoviesIds] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const handleBack = () => {
        props.history.goBack();
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get(getActorDetailsUrl(actorId, tmdbApi))
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
        const farFuture = new Date((new Date).getFullYear() + 10, 1,1);
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
        allMovies = <React.Fragment>
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
                                exist={moviesIds ? moviesIds.includes(movie.id) : false}/>)
                }
            </div>
        </React.Fragment>;
    }

    return (
        <List className={root}>
            {allMovies}
        </List>
    );
};

export default actorMovies;