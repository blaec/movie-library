import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";


import ActorMovie from "./components/ActorMovie";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import MyArrowBack from "../../../../UI/Buttons/Icons/MyArrowBack";
import {drawer} from "../../../../utils/Constants";
import {isArrayExist, isMovieInCast, isMovieInCollection, isObjectsExist, isStringExist} from "../../../../utils/Utils";
import {fetchActorDetails} from "../../../../store/state/details/details-actions";

import {Box, List, makeStyles, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import * as PropTypes from "prop-types";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

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
        // position: 'fixed',
        backgroundColor: '#5c6bc0',
        // width: '100%',
        height: 50,
        color: 'white',
        [`@media (orientation:landscape)`]: {
            // width: `calc(80% - ${drawer.width * .8}px)`,
        },
        [`${theme.breakpoints.up(1000)} and (orientation:landscape)`]: {
            // width: `calc(50% - ${drawer.width * .5}px)`,
        },
    },
    movieItems: {
        marginTop: 40,
    }
}));

const actorDetails = () => {
    const params = useParams();
    const history = useHistory();
    const {actorId} = params;
    const {root, sticky, actor, movieItems} = useStyles();

    const [tabSelected, setTabSelected] = useState(0);

    const movies = useSelector(state => state.collection.movies);
    const tmdbApi = useSelector(state => state.api.tmdb);
    const actorDetails = useSelector(state => state.details.actorDetails);
    const dispatch = useDispatch();

    const handleBack = () => {
        history.goBack();
    };

    const handleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [window.scrollY]);

    useEffect(() => {
        if (isStringExist(tmdbApi)) {
            dispatch(fetchActorDetails(actorId, tmdbApi));
        }
    }, [tmdbApi, actorId]);

    let hasData = isObjectsExist(actorDetails, movies);
    let allMovies = <MyLoader/>;
    if (hasData) {
        const {name, credits: {cast}} = actorDetails;
        const farFuture = new Date((new Date()).getFullYear() + 10, 1, 1);
        const movieList = cast.filter(movie => {
            // skip 'Documentary' movies and movies without genres
            const {genre_ids} = movie;
            return !genre_ids.includes(99)
                && isArrayExist(genre_ids);
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
        const moviesInCollection = movieList.filter(movie => isMovieInCollection(movies, movie.id));
        const moviesSize = movies
            .filter(movie => isMovieInCast(moviesInCollection, movie.tmdbId))
            .reduce(((sum, movie) => sum + movie.size), 0);

        allMovies = (
            <div className={root}>
                <div className={sticky}>
                    <MyArrowBack onClose={handleBack}/>
                    <Typography className={actor}
                                variant="h6">
                        {`${name} (${moviesInCollection.length}/${movieList.length}) - ${moviesSize.toFixed(0)}Gb`}
                    </Typography>
                </div>
                <div className={movieItems}>
                    <Paper square>
                        <Tabs
                            value={tabSelected}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Info"/>
                            <Tab label="Movies"/>
                        </Tabs>
                    </Paper>
                    <TabPanel value={tabSelected} index={0}>
                        INFO
                    </TabPanel>
                    <TabPanel value={tabSelected} index={1}>
                        <List>
                            <div className={movieItems}>
                                {movieList.map(movie =>
                                    <ActorMovie key={movie.id}
                                                {...movie}
                                                exist={moviesInCollection.includes(movie)}/>)
                                }
                            </div>
                        </List>
                    </TabPanel>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            {allMovies}
        </React.Fragment>
    );
};

export default actorDetails;