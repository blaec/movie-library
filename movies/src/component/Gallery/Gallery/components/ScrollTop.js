import React from 'react';

import {useScrollTrigger, Zoom} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const scrollTop = (props) => {
    const {children} = props;
    const {root} = useStyles();

    const trigger = useScrollTrigger({disableHysteresis: true});

    const handleClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Zoom in={trigger}>
            <div
                className={root}
                onClick={handleClick}
            >
                {children}
            </div>
        </Zoom>
    );
}

export default scrollTop;