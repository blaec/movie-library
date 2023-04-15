import React from 'react';

import {Box, createTheme, useScrollTrigger, Zoom} from "@mui/material";

const theme = createTheme();
const _position = {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
};


const scrollTop = (props) => {
    const {children} = props;

    const trigger = useScrollTrigger({disableHysteresis: true});

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    return (
        <Zoom in={trigger}>
            <Box
                sx={_position}
                onClick={handleClick}
            >
                {children}
            </Box>
        </Zoom>
    );
}

export default scrollTop;