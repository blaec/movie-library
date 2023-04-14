import React from 'react';

import {Box} from "@mui/material";
import * as PropTypes from "prop-types";


const myTabPanel = (props) => {
    const {children, value, index, padding, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box p={padding === undefined ? 3 : padding}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default myTabPanel;

myTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
