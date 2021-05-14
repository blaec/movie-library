import React from 'react';

import FileLoader from "./components/FileLoader/FileLoader";
import WishLoader from "./components/WishLoader/WishLoader";

import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
}));

const upload = () => {
    const {root} = useStyles();

    let loaders = [<WishLoader/>, <FileLoader/>]
    // TODO duplicate Filter.js
    const border = <Grid item xs={1} lg={2} xl={3}/>;
    return (
        <React.Fragment>
            <Grid container className={root}>
                {border}
                <Grid item xs={10} lg={8} xl={6}>
                    <Grid container spacing={2}>
                        {loaders.map((loader, index) =>
                            <Grid key={index} item xs={12} md={6}>
                                {loader}
                            </Grid>)
                        }
                    </Grid>
                </Grid>
                {border}
            </Grid>
        </React.Fragment>
    );
};

export default upload;