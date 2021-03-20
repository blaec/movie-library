import React from 'react';
import {Box} from "@material-ui/core";

const fact = props => {
    return (
        <React.Fragment>
            <Box fontSize="subtitle1.fontSize"
                 fontWeight="fontWeightBold">
                {props.header}
            </Box>
            <Box fontSize="subtitle2.fontSize"
                 fontWeight="fontWeightLight">
                {props.text}
            </Box>
        </React.Fragment>
    );
};

export default fact;