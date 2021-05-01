import React from 'react';

import FileLoader from "./components/FileLoader";
import WishLoader from "./components/WishLoader";

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
    return (
        <React.Fragment>
            <Grid container className={root}>
                <Grid item xs={1} lg={2} xl={3}/>
                <Grid item xs={10} lg={8} xl={6}>
                    <Grid container spacing={2}>
                        {loaders.map((loader, index) =>
                            <Grid key={index} item xs={12} md={6}>
                                {loader}
                            </Grid>)
                        }
                    </Grid>
                </Grid>
                <Grid item xs={1} lg={2} xl={3}/>
            </Grid>
        </React.Fragment>
    );
};

export default upload;