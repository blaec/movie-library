import React from 'react';

import {Skeleton} from "@material-ui/lab";

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