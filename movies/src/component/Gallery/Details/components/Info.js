import React from 'react';

import {Box, Divider, List, makeStyles, Paper, Tab, Tabs, Typography} from "@material-ui/core";

import {a11yProps, NA_Safe, playTime, year} from "../../../../utils/Utils";
import Actor from "./Actor";
import Facts from "./Facts/Facts";
import '../Details.css';
import TabPanel from "../../../Tabs/TabPanel";
import * as PropTypes from "prop-types";

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const info = props => {
    const {omdbDetails, tmdbDetails, fileDetails, castDetails, genreDetails, onActorSelect} = props;
    const {Rated, imdbRating, imdbVotes} = omdbDetails;
    const {release_date, runtime, title, tagline, overview} = tmdbDetails;
    const {resolution, size, location} = fileDetails;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const metadata = {
        rated: NA_Safe(Rated),
        release_date: year(release_date),
        runtime: runtime !== 0
            ? playTime(runtime)
            : null,
        rating: NA_Safe(imdbRating, `${imdbRating} [${imdbVotes}]`),
        resolution: resolution,
        fileSize: size
            ? `${size}Gb`
            : null
    };

    return (
        <React.Fragment>

            {/* Main movie info */}
            <div className="Info">
                <Typography component="div">
                    <Box fontSize="caption.fontSize"
                         fontWeight="fontWeightLight">
                        {location}
                    </Box>
                    <Divider/>
                    <Box fontSize="subtitle2.fontSize"
                         fontWeight="fontWeightRegular"
                         textAlign="center"
                         paddingTop={1}
                    >
                        {Object.values(metadata)
                            .filter(val => val !== null)
                            .join(` | `)}
                    </Box>
                    <Box fontSize="h4.fontSize" fontWeight="fontWeightBold" textAlign="center">
                        {title}
                    </Box>
                    <Box fontSize="subtitle2.fontSize"  fontWeight="fontWeightMedium" textAlign="center">
                        {genreDetails}
                    </Box>
                </Typography>
            </div>

            {/* Additional movie info: tabs: Info and Cast */}
            <div className={classes.root}>
                <Paper square>
                    <Tabs value={value}
                          onChange={handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth">
                        <Tab label="Info" {...a11yProps(0)} />
                        <Tab label="Cast" {...a11yProps(1)} />
                        <Tab label="Facts" {...a11yProps(2)} />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <Box fontSize="subtitle2.fontSize"
                         fontWeight="fontWeightBold"
                         textAlign="right"
                         paddingBottom={1}
                         paddingLeft={20}>
                        {tagline}
                    </Box>
                    <Box fontSize="body1.fontSize">
                        {overview}
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <List>
                        {
                            castDetails
                                .map(actor => <Actor key={actor.id} {...actor} onActorSelect={onActorSelect}/>)
                                .reduce((prev, curr, index) => [prev, <Divider key={index}/>, curr])
                        }
                    </List>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <List>
                        <Facts omdbDetails={omdbDetails}
                               tmdbDetails={tmdbDetails}/>
                    </List>
                </TabPanel>
            </div>
        </React.Fragment>
    );
};

export default info;