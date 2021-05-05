import React from 'react';

import Description from "./InfoComponents/Tabs/Description";
import Cast from "./InfoComponents/Tabs/Cast/Cast";
import Facts from "./InfoComponents/Tabs/Facts/Facts";
import InfoGeneral from "./InfoComponents/InfoGeneral";
import * as PropTypes from "prop-types";

import {Box, makeStyles, Paper, Tab, Tabs} from "@material-ui/core";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel"
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

const info = props => {
    const {
        omdbDetails,
        tmdbDetails,
        tmdbDetails: {tagline, overview},
        fileDetails,
        castDetails,
        genreDetails
    } = props;
    const {root, tabsBackground} = useStyles();
    const [tabSelected, setTabSelected] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    return (
        <React.Fragment>
            <InfoGeneral omdbDetails={omdbDetails}
                         tmdbDetails={tmdbDetails}
                         fileDetails={fileDetails}
                         genreDetails={genreDetails}/>
            <div className={`${root} ${tabsBackground}`}>
                <Paper square className={tabsBackground}>
                    <Tabs value={tabSelected}
                          onChange={handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth">
                        <Tab label="Description"/>
                        <Tab label="Cast"/>
                        <Tab label="Facts"/>
                    </Tabs>
                </Paper>
                <TabPanel value={tabSelected} index={0}>
                    <Description tagline={tagline}
                                 overview={overview}/>
                </TabPanel>
                <TabPanel value={tabSelected} index={1}>
                    <Cast castDetails={castDetails}/>
                </TabPanel>
                <TabPanel value={tabSelected} index={2}>
                    <Facts omdbDetails={omdbDetails}
                           tmdbDetails={tmdbDetails}/>
                </TabPanel>
            </div>
        </React.Fragment>
    );
};

export default info;