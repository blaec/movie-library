import React from 'react';

import {AppBar, Divider, makeStyles, Tab, Tabs, Typography} from "@material-ui/core";

import {a11yProps, playTime, year} from "../../../../utils/Utils";
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
        <div className={classes.root}>
            <Typography variant="caption" display="block" gutterBottom color="textSecondary">
                {props.file.location}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {Object.values(metadata)
                    .filter(val => val !== null)
                    .join(` \u2B24 `)}
            </Typography>
            <Typography variant="h5" gutterBottom>
                <strong>{props.details.title}</strong>
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {props.genres}
            </Typography>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Typography variant="body1" gutterBottom>
                    <strong>{props.details.tagline}</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {props.details.overview}
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    );
};

export default info;