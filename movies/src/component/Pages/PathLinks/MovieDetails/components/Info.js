import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import MyLoader from "../../../../../UI/Spinners/MyLoader";
import Description from "./InfoComponents/Tabs/Description";
import Cast from "./InfoComponents/Tabs/Cast/Cast";
import Facts from "./InfoComponents/Tabs/Facts/Facts";
import Trailers from "./InfoComponents/Tabs/Trailers";
import InfoGeneral from "./InfoComponents/InfoGeneral";
import * as PropTypes from "prop-types";
import {isArrayExist, isObjectExist} from "../../../../../utils/Utils";
import {previousLocation} from "../../../../../store/localStorage/actions";
import {reactLinks} from "../../../../../utils/UrlUtils";
import {MovieTab} from "../../../../../utils/Constants";

import {Box, makeStyles, Paper, Tab, Tabs} from "@material-ui/core";

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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

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
                        <Tabs value={tabSelected}
                              onChange={handleChange}
                              indicatorColor="primary"
                              textColor="primary"
                              variant="fullWidth">
                            <Tab label="Description"/>
                            <Tab label="Cast"/>
                            <Tab label="Trailers"/>
                            <Tab label="Facts"/>
                        </Tabs>
                    </Paper>
                    <TabPanel
                        value={tabSelected}
                        index={MovieTab.description}
                    >
                        <Description details={{...tmdbMovieDetails, ...omdbMovieDetails}}/>
                    </TabPanel>
                    <TabPanel
                        value={tabSelected}
                        index={MovieTab.cast}
                    >
                        <Cast details={cast}/>
                    </TabPanel>
                    <TabPanel
                        value={tabSelected}
                        index={MovieTab.trailers}
                    >
                        <Trailers/>
                    </TabPanel>
                    <TabPanel
                        value={tabSelected}
                        index={MovieTab.facts}
                    >
                        <Facts details={{...tmdbMovieDetails, ...omdbMovieDetails}}/>
                    </TabPanel>
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