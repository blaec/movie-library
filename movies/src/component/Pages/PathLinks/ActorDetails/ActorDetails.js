import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";
import {useTranslation} from "react-i18next";

import MyTabPanel from "../../../../UI/MyTabPanel";
import ActorFacts from "./components/ActorFacts";
import Biography from "./components/Biography";
import ActorImage from "./components/ActorImage";
import ActorMovie from "./components/ActorMovie";
import {groupBy, isArrayExist, isMovieInCollection} from "../../../../utils/Utils";
import {fetchActorDetails, fetchActorImages} from "../../../../store/state/details/details-actions";
import MyRectSkeleton from "../../../../UI/Skeleton/MyRectSkeleton";
import MovieStatusSwitch from "./components/MovieStatusSwitch";
import MyResponse from "../../../../UI/MyResponse";
import {ActorTab} from "../../../../utils/Constants";

import {List, makeStyles, Paper, Tab, Tabs} from "@mui/material";


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
    const {actorId, type} = params;
    const {root, movieItems} = useStyles();
    const {t} = useTranslation('common');

    const [tabSelected, setTabSelected] = useState(0);
    const [isCollectionMovie, setIsCollectionMovie] = useState(false);

    const {
        collectionItems: movies,
        isCollectionItemsLoaded: isMoviesLoaded
    } = useSelector(state => state.collection.movies);
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const {actorDetails, isActorDetailsLoaded} = useSelector(state => state.details.actorDetails);
    const dispatch = useDispatch();

    const handleBack = () => {
        history.goBack();
    };

    const handleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    const handleCollectionMovieFilter = (value) => {
        setIsCollectionMovie(value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [window.scrollY]);

    useEffect(() => {
        if (hasTmdbApi) {
            dispatch(fetchActorDetails(actorId, tmdbApi));
            dispatch(fetchActorImages(actorId, tmdbApi));
        }
    }, [tmdbApi, actorId]);

    let allMovies = (
        <MyRectSkeleton
            className={movieItems}
            height={320}
        />
    );
    let movieList = [];
    let moviesInCollection = [];
    let actorImage = null;
    let isDataLoaded = isActorDetailsLoaded && isMoviesLoaded;
    if (isDataLoaded) {
        const {credits, biography} = actorDetails;
        const farFuture = new Date((new Date()).getFullYear() + 10, 1, 1);
        movieList = credits[type].filter(movie => {
                // skip 'Documentary' movies and movies without genres
                const {genre_ids} = movie;
                return isArrayExist(genre_ids) && !genre_ids.includes(99);
            }).sort((a, b) => {
                const getDate = (movie) => {
                    const {release_date} = movie;
                    return (release_date === undefined || release_date === "")
                        ? farFuture
                        : release_date
                };
                return new Date(getDate(a)) < new Date(getDate(b)) ? 1 : -1;
            });
        moviesInCollection = movieList.filter(movie => isMovieInCollection(movies, movie.id));

        const moviesToDisplay = isCollectionMovie ? moviesInCollection : movieList;
        let actorMovies = moviesToDisplay.length > 0
            ? groupBy(moviesToDisplay).map((movie, index) =>
                <ActorMovie key={`${index}${movie.id}`}
                            {...movie}
                            exist={moviesInCollection.filter(m => m.id === movie.id).length > 0}/>
            )
            : <MyResponse message={t('text.noMovieWithActor')}/>;
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
                        <Tab label={t('tab.movies')}/>
                        <Tab label={t('tab.bio')}/>
                        <Tab label={t('tab.facts')}/>
                    </Tabs>
                </Paper>
                <MyTabPanel
                    value={tabSelected}
                    index={ActorTab.movies}
                    padding={0}
                >
                    <List>
                        <div className={movieItems}>
                            <MovieStatusSwitch onSwitchChange={handleCollectionMovieFilter}/>
                            {actorMovies}
                        </div>
                    </List>
                </MyTabPanel>
                <MyTabPanel
                    value={tabSelected}
                    index={ActorTab.biography}
                >
                    <Biography biography={biography}/>
                </MyTabPanel>
                <MyTabPanel
                    value={tabSelected}
                    index={ActorTab.facts}
                >
                    <ActorFacts details={actorDetails}/>
                </MyTabPanel>
            </div>
        );
        actorImage = (
            <ActorImage
                actorDetails={actorDetails}
                movies={movies}
                movieList={movieList}
                moviesInCollection={moviesInCollection}
                onClose={handleBack}
            />
        );
    }

    return (
        <div className={root}>
            {actorImage}
            {allMovies}
        </div>
    );
};

export default actorDetails;