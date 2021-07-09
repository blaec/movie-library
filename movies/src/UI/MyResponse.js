import React from 'react';

import {makeStyles} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const myResponse = (props) => {
    const{message} = props;
    const {root} = useStyles();

    return (
        <div className={root}>
            <Alert severity="warning">{message}</Alert>
        </div>
    );
};

export default myResponse;