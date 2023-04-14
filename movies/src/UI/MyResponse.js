import React from 'react';

import {makeStyles} from "@mui/styles";
import {Alert} from "@mui/lab";

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