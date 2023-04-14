import React from 'react';

import {Grid, makeStyles} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
}));

const myInnerGrid = (props) => {
    const {root} = useStyles();

    return (
        <Grid container className={root}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {props.children.map((child, index) =>
                        <Grid key={index} item xs={12} md={6}>
                            {child}
                        </Grid>)
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default myInnerGrid;