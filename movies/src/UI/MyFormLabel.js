import React from 'react';

import {FormLabel} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(themes => ({
    label: {
        fontWeight: 1000,
        fontSize: 20
    },
}));

const myFormLabel = (props) => {
    const {text, customStyle} = props;
    const {label} = useStyles();

    return (
        <FormLabel
            className={label}
            style={customStyle}
        >
            {text}
        </FormLabel>
    );
};

export default myFormLabel;