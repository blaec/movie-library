import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
}));

const myFullWidthGrid = (props) => {
    const {root} = useStyles();

    let border = <Grid item xs={1} lg={2} xl={3}/>;
    return (
        <Grid container className={root}>
            {border}
            <Grid item xs={10} lg={8} xl={6}>
                <Grid container spacing={2}>
                    {props.children.map((child, index) =>
                        <Grid key={index} item xs={12}>
                            {child}
                        </Grid>)
                    }
                </Grid>
            </Grid>
            {border}
        </Grid>
    );
};

export default myFullWidthGrid;