import React from 'react';

import {toolbarHeight} from "../../../utils/Constants";


import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    logoMovie: {
        fontWeight: 900,
        fontFamily: ['Truculenta', "!important"],
    },
    logoLibrary: {
        fontWeight: 300,
        fontFamily: ['Truculenta', "!important"]
    },
    logo: {
        [theme.breakpoints.up('sm')]: {
            height: toolbarHeight.mobile,
        },
        height: toolbarHeight.desktop,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const logo = () => {
    const {logoMovie, logoLibrary, logo} = useStyles();
    return (
        <Box className={logo}>
            <Typography className={logoMovie}
                        display='inline'
                        color="primary"
                        variant="h5">
                MOVIE
            </Typography>
            <Typography className={logoLibrary}
                        display='inline'
                        color="secondary"
                        variant="h5">
                LIBRARY
            </Typography>
        </Box>
    );
};

export default logo;