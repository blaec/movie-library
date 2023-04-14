import React from 'react';

import {Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
}));

const myButtonGrid = (props) => {
    const {root} = useStyles();

    return (
        <Grid container className={root}>
            <Grid container
                  item
                  xs={12}
                  justify='flex-end'
            >
                {props.children}
            </Grid>
        </Grid>
    );
};

export default myButtonGrid;