import React from 'react';

import {LinearProgress} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        height: theme.spacing(1)
    }
}));

const myLinearProgress = (props) => {
    const {loading} = props;
    const {root} = useStyles();

    return (
        <div className={root}>
            <LinearProgress hidden={!loading}/>
        </div>
    );
};

export default myLinearProgress;
