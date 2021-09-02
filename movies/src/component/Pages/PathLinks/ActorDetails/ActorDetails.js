import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";
import {useTranslation} from "react-i18next";

import MyTabPanel from "../../../../UI/MyTabPanel";
import ActorFacts from "./components/ActorFacts";
import Biography from "./components/Biography";
import ActorImage from "./components/ActorImage";
import ActorMovie from "./components/ActorMovie";
import {isArrayExist, isMovieInCollection, isObjectsExist, isStringExist} from "../../../../utils/Utils";
import {fetchActorDetails, fetchActorImages} from "../../../../store/state/details/details-actions";
import MyRectSkeleton from "../../../../UI/Skeleton/MyRectSkeleton";

import {List, makeStyles, Paper, Tab, Tabs} from "@material-ui/core";


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
        // marginTop: 40,
    },
}));

const actorDetails = () => {
    const params = useParams();
    const history = useHistory();
    const {actorId} = params;
    const {root, movieItems} = useStyles();
    const {t} = useTranslation('common');

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
    let allMovies = <MyRectSkeleton
                        className={movieItems}
                        height={320}
                    />;
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
                <Paper square style={{paddingTop: '50px'}}>
                    <Tabs
                        value={tabSelected}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label={t('tab.bio')}/>
                        <Tab label={t('tab.movies')}/>
                        <Tab label={t('tab.facts')}/>
                    </Tabs>
                </Paper>
                <MyTabPanel value={tabSelected} index={0}>
                    <Biography biography={biography}/>
                </MyTabPanel>
                <MyTabPanel value={tabSelected} index={1} padding={0}>
                    <List>
                        <div className={movieItems}>
                            {movieList.map(movie =>
                                <ActorMovie key={movie.id}
                                            {...movie}
                                            exist={moviesInCollection.includes(movie)}/>)
                            }
                        </div>
                    </List>
                </MyTabPanel>
                <MyTabPanel value={tabSelected} index={2}>
                    <ActorFacts details={actorDetails}/>
                </MyTabPanel>
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