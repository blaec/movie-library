import React from 'react';
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    // logo: {
    //     [theme.breakpoints.down('xs')]: {
    //         display: 'none',
    //     }
    // },
    logoMovie: {
        fontWeight: 1000
    },
    logoLibrary: {
        fontWeight: 300,
    }
}));

const logo = () => {
    const {logo, logoMovie, logoLibrary} = useStyles();
    return (
        <Box className={logo}>
            <Typography className={logoMovie}
                        display='inline'
                        variant="h6">
                MOVIE
            </Typography>
            <Typography className={logoLibrary}
                        display='inline'
                        color="secondary"
                        variant="h6">
                LIBRARY
            </Typography>
        </Box>    );
};

export default logo;