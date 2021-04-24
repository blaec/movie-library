import React from 'react';

import {Box} from "@material-ui/core";

const description = (props) => {
    const{tagline, overview} = props;

    return (
        <React.Fragment>
            <Box fontSize="subtitle2.fontSize"
                 fontWeight="fontWeightBold"
                 textAlign="right"
                 paddingBottom={1}
                 paddingLeft={20}>
                {tagline}
            </Box>
            <Box fontSize="body1.fontSize">
                {overview}
            </Box>
        </React.Fragment>
    );
};

export default description;