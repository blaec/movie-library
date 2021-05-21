import React from 'react';

import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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