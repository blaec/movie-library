import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";

import Facts from "./components/Facts";
import Biography from "./components/Biography";
import ActorImage from "./components/ActorImage";
import ActorMovie from "./components/ActorMovie";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import MyArrowBack from "../../../../UI/Buttons/Icons/MyArrowBack";
import {drawer} from "../../../../utils/Constants";
import {isArrayExist, isMovieInCast, isMovieInCollection, isObjectsExist, isStringExist} from "../../../../utils/Utils";
import {fetchActorDetails, fetchActorImages} from "../../../../store/state/details/details-actions";

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
    movieItems: {
        marginTop: 40,
    },
}));

const actorDetails = () => {
    const params = useParams();
    const history = useHistory();
    const {actorId} = params;
    const {root, movieItems} = useStyles();

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
            dispatch(fetchActorImages(actorId, tmdbApi));
        }
    }, [tmdbApi, actorId]);

    let hasData = isObjectsExist(actorDetails, movies);
    let allMovies = <MyLoader/>;
    let movieList = [];
    let moviesInCollection = [];
    if (hasData) {
        const {credits: {cast}, biography} = actorDetails;
        const farFuture = new Date((new Date()).getFullYear() + 10, 1, 1);
        movieList = cast.filter(movie => {
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
        moviesInCollection = movieList.filter(movie => isMovieInCollection(movies, movie.id));

        allMovies = (
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
                        <Tab label="Facts"/>
                    </Tabs>
                </Paper>
                <TabPanel value={tabSelected} index={0}>
                    <Biography biography={biography}/>
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
                <TabPanel value={tabSelected} index={2}>
                    <Facts details={actorDetails}/>
                </TabPanel>
            </div>
        );
    }

    return (
        <div className={root}>
            <ActorImage
                actorDetails={actorDetails}
                movies={movies}
                movieList={movieList}
                moviesInCollection={moviesInCollection}
                onClose={handleBack}
            />
            {allMovies}
        </div>
    );
};

export default actorDetails;