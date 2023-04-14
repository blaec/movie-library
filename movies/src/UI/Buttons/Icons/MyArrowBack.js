import React from 'react';

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        margin: '5px',
        padding: '5px',
        color: '#696969',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: '50%',
        cursor: 'pointer',
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