import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import MyTabPanel from "../../../../../UI/MyTabPanel";
import Description from "./InfoComponents/Tabs/Description";
import Cast from "./InfoComponents/Tabs/Cast/Cast";
import MovieFacts from "./InfoComponents/Tabs/Facts/MovieFacts";
import Trailers from "./InfoComponents/Tabs/Trailers";
import InfoGeneral from "./InfoComponents/InfoGeneral";
import {MovieTab} from "../../../../../utils/Constants";
import MyRectSkeleton from "../../../../../UI/Skeleton/MyRectSkeleton";
import MyTextSkeleton from "../../../../../UI/Skeleton/MyTextSkeleton";
import Crew from "./InfoComponents/Tabs/Crew/Crew";

import {Box, makeStyles, Paper, Tab, Tabs} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tabsBackground: {
        backgroundColor: '#3f51b50f',
    }
}));

const info = () => {
    const {root, tabsBackground} = useStyles();
    const [tabSelected, setTabSelected] = useState(0);
    const {t} = useTranslation('common');

    const {tmdbMovieDetails, isTmdbMovieDetailsLoaded} = useSelector(state => state.details.movieTmdbDetails);
    const {omdbMovieDetails, isOmdbMovieDetailsLoaded} = useSelector(state => state.details.movieOmdbDetails);
    const {cast, isCastLoaded} = useSelector(state => state.details.cast);
    const {crew, isCrewLoaded} = useSelector(state => state.details.crew);
    const {
        collectionItems: movies,
        isCollectionItemsLoaded: isMoviesLoaded
    } = useSelector(state => state.collection.movies);

    const handleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    let info = (
        <Box>
            <MyTextSkeleton width='40%'/>
            <MyTextSkeleton width='50%'/>
            <MyTextSkeleton width='80%' center/>
            <MyTextSkeleton width='60%' center height={50}/>
            <MyTextSkeleton width='80%' center/>
            <MyRectSkeleton height={300}/>
        </Box>
    );
    const isDataLoaded = (isTmdbMovieDetailsLoaded || isOmdbMovieDetailsLoaded)
        && isMoviesLoaded && isCastLoaded && isCrewLoaded;
    if (isDataLoaded) {
        info = (
            <React.Fragment>
                <InfoGeneral
                    movies={movies}
                    details={{...tmdbMovieDetails, ...omdbMovieDetails}}
                />
                <div className={`${root} ${tabsBackground}`}>
                    <Paper square className={tabsBackground}>
                        <Tabs
                            value={tabSelected}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label={t('tab.cast')}/>
                            <Tab label={t('tab.description')}/>
                            <Tab label={t('tab.trailers')}/>
                            <Tab label={t('tab.crew')}/>
                            <Tab label={t('tab.facts')}/>
                        </Tabs>
                    </Paper>
                    <MyTabPanel
                        value={tabSelected}
                        index={MovieTab.cast}
                        padding={0}
                    >
                        <Cast details={cast}/>
                    </MyTabPanel>
                    <MyTabPanel
                        value={tabSelected}
                        index={MovieTab.description}
                    >
                        <Description details={{...tmdbMovieDetails, ...omdbMovieDetails}}/>
                    </MyTabPanel>
                    <MyTabPanel
                        value={tabSelected}
                        index={MovieTab.trailers}
                    >
                        <Trailers/>
                    </MyTabPanel>
                    <MyTabPanel
                        value={tabSelected}
                        index={MovieTab.crew}
                        padding={0}
                    >
                        <Crew details={crew}/>
                    </MyTabPanel>
                    <MyTabPanel
                        value={tabSelected}
                        index={MovieTab.facts}
                    >
                        <MovieFacts details={{...tmdbMovieDetails, ...omdbMovieDetails}}/>
                    </MyTabPanel>
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {info}
        </React.Fragment>
    );
};

export default info;