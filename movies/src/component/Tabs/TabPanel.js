import React from 'react';
import {Box} from "@material-ui/core";

const tabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel"
             hidden={value !== index}
             {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default tabPanel;