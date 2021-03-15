import React from 'react';

import {Box, Divider, makeStyles, Paper, Tab, Tabs, Typography} from "@material-ui/core";

import {a11yProps, playTime, year} from "../../../../utils/Utils";
import Actor from "./Actor";
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
    console.log(props.cast);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const metadata = {
        release_date: year(props.details.release_date),
        runtime: props.details.runtime !== 0
            ? playTime(props.details.runtime)
            : null,
        resolution: props.file.resolution,
        fileSize: props.file.size
            ? `${props.file.size}Gb`
            : null
    };

    return (
        <React.Fragment>
            <div className="Info">
                <Typography component="div">
                    <Box fontSize="caption.fontSize"
                         fontWeight="fontWeightLight">
                        {props.file.location}
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
                        {props.details.title}
                    </Box>
                    <Box fontSize="subtitle2.fontSize"  fontWeight="fontWeightMedium" textAlign="center">
                        {props.genres}
                    </Box>
                </Typography>
            </div>
            <div className={classes.root}>
                <Paper square>
                    <Tabs value={value}
                          onChange={handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          aria-label="simple tabs example"
                          variant="fullWidth">
                        <Tab label="Info" {...a11yProps(0)} />
                        <Tab label="Cast" {...a11yProps(1)} />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <Box fontSize="subtitle2.fontSize"
                         fontWeight="fontWeightBold"
                         textAlign="right"
                         paddingBottom={1}
                         paddingLeft={20}>
                        {props.details.tagline}
                    </Box>
                    <Box fontSize="body1.fontSize">
                        {props.details.overview}
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {props.cast.map(actor => <Actor key={actor.cast_id} {...actor}/>)}
                </TabPanel>
            </div>
        </React.Fragment>
    );
};

export default info;