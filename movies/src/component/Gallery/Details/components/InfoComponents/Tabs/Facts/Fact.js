import React from 'react';

import {Box} from "@material-ui/core";

const fact = props => {
    const {header, text} = props;

    return (
        <React.Fragment>
            <Box fontSize="subtitle1.fontSize"
                 fontWeight="fontWeightBold">
                {header}
            </Box>
            <Box fontSize="subtitle2.fontSize"
                 fontWeight="fontWeightLight">
                {text}
            </Box>
        </React.Fragment>
    );
};

export default fact;