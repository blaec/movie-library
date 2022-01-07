import React, {useState} from 'react';
import {useSelector} from "react-redux";

import MyTabPanel from "../../../../../UI/MyTabPanel";
import Description from "./InfoComponents/Tabs/Description";
import Cast from "./InfoComponents/Tabs/Cast/Cast";
import MovieFacts from "./InfoComponents/Tabs/Facts/MovieFacts";
import Trailers from "./InfoComponents/Tabs/Trailers";
import InfoGeneral from "./InfoComponents/InfoGeneral";
import {isArraysExist, isObjectExist} from "../../../../../utils/Utils";
import {MovieTab} from "../../../../../utils/Constants";
import MyRectSkeleton from "../../../../../UI/Skeleton/MyRectSkeleton";
import MyTextSkeleton from "../../../../../UI/Skeleton/MyTextSkeleton";

import {Box, makeStyles, Paper, Tab, Tabs} from "@material-ui/core";
import {useTranslation} from "react-i18next";


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

    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const omdbMovieDetails = useSelector(state => state.details.movieOmdbDetails);
    const cast = useSelector(state => state.details.cast);
    const movies = useSelector(state => state.collection.movies);

    const handleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    const hasDetails = (isObjectExist(tmdbMovieDetails) || isObjectExist(omdbMovieDetails))
        && isArraysExist(cast, movies);
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
    if (hasDetails) {
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