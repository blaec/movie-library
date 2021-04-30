import React from 'react';

import {FormLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(themes => ({
    label: {
        fontWeight: 1000,
        fontSize: 20
    },
}));

const myFormLabel = (props) => {
    const {text, customStyle} = props;
    const {label} = useStyle();

    return (
        <FormLabel className={label}
                   style={customStyle}>
            {text}
        </FormLabel>
    );
};

export default myFormLabel;