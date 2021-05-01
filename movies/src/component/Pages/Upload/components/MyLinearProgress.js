import React from 'react';
import {LinearProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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