import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import MyTabPanel from "../../../../../UI/MyTabPanel";
import MyLoader from "../../../../../UI/Spinners/MyLoader";
import Description from "./InfoComponents/Tabs/Description";
import Cast from "./InfoComponents/Tabs/Cast/Cast";
import MovieFacts from "./InfoComponents/Tabs/Facts/MovieFacts";
import Trailers from "./InfoComponents/Tabs/Trailers";
import InfoGeneral from "./InfoComponents/InfoGeneral";
import {isArrayExist, isObjectExist} from "../../../../../utils/Utils";
import {previousLocation} from "../../../../../store/localStorage/actions";
import {reactLinks} from "../../../../../utils/UrlUtils";
import {MovieTab} from "../../../../../utils/Constants";

import {makeStyles, Paper, Tab, Tabs} from "@material-ui/core";


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

    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const omdbMovieDetails = useSelector(state => state.details.movieOmdbDetails);
    const cast = useSelector(state => state.details.cast);

    const handleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    useEffect(() => {
        if (previousLocation.get().includes(reactLinks.actorDetailsEndpoint)) {
            setTabSelected(MovieTab.cast);
        }
    }, []);

    const hasDetails = (isObjectExist(tmdbMovieDetails) || isObjectExist(omdbMovieDetails)) && isArrayExist(cast);
    let info = <MyLoader/>
    if (hasDetails) {
        info = (
            <React.Fragment>
                <InfoGeneral details={{...tmdbMovieDetails, ...omdbMovieDetails}}/>
                <div className={`${root} ${tabsBackground}`}>
                    <Paper square className={tabsBackground}>
                        <Tabs
                            value={tabSelected}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Description"/>
                            <Tab label="Cast"/>
                            <Tab label="Trailers"/>
                            <Tab label="Facts"/>
                        </Tabs>
                    </Paper>
                    <MyTabPanel
                        value={tabSelected}
                        index={MovieTab.description}
                    >
                        <Description details={{...tmdbMovieDetails, ...omdbMovieDetails}}/>
                    </MyTabPanel>
                    <MyTabPanel
                        value={tabSelected}
                        index={MovieTab.cast}
                        padding={0}
                    >
                        <Cast details={cast}/>
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