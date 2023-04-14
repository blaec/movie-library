import React from 'react';

import {Skeleton} from "@mui/lab";

const myRectSkeleton = (props) => {
    const {className, height} = props;
    return (
        <Skeleton
            animation="wave"
            variant="rect"
            className={className}
            height={height}
        />
    );
};

export default myRectSkeleton;