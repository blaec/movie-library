import React from 'react';

import {toolbarHeight} from "../../../utils/Constants";


import {Box, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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
const _logoMovie = {
    fontWeight: 900,
    fontFamily: 'Truculenta',
    color: 'primary.main',
    display: 'inline',
};
const _logoLibrary = {
    fontWeight: 300,
    fontFamily: 'Truculenta',
    color: 'red',
    display: 'inline',
};

const logo = () => {
    const {logo} = useStyles();
    return (
        <Box className={logo}>
            <Typography
                sx={_logoMovie}
                variant="h5"
            >
                MOVIE
            </Typography>
            <Typography
                sx={_logoLibrary}
                variant="h5"
            >
                LIBRARY
            </Typography>
        </Box>
    );
};

export default logo;