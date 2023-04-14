import React from 'react';

import {Skeleton} from "@mui/lab";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto'
    },
}));

const myTextSkeleton = (props) => {
    const {height, width, center} = props;
    let {root} = useStyles();

    return (
        <Skeleton
            className={center ? root : null}
            animation="wave"
            variant="text"
            height={height}
            width={width}
        />
    );
};

export default myTextSkeleton;