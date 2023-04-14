import React from 'react';

import {Typography} from "@mui/material";

const radioLabel = (props) => {
    const {data:{label, count, size}} = props;
    return (
        <React.Fragment>
            <Typography display='inline'>
                {label}
            </Typography>
            <Typography
                display='inline'
                variant='overline'
                color='textSecondary'
            >
                {` (${count} | ${size}Gb)`}
            </Typography>
        </React.Fragment>
    );
};

export default radioLabel;