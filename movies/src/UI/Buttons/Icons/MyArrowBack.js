import React from 'react';

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '5px',
        left: '5px',
        padding: '5px',
        color: '#696969',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: '50%',
        zIndex: 1,
    }
}));

const myArrowBack = (props) => {
    const {onClose} = props;
    const {root} = useStyles();

    return (
        <ArrowBackIcon
            className={root}
            fontSize="large"
            onClick={onClose}/>
    );
};

export default myArrowBack;