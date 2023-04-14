import React from 'react';

import {Box, Link, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    headerFont: {
        fontWeight: 900,
    },
    textFont: {
        fontWeight: 100,
    },
}));

const fact = props => {
    const {header, text, homepage} = props;
    const {headerFont, textFont} = useStyles();

    let textElement = null;
    if (text) {
        textElement = (
            <Typography className={textFont}
                        display='inline'
                        variant='subtitle1'>
                {text}
            </Typography>
        );
    }
    let linkElement = null;
    if (homepage) {
        linkElement = (
            <Link href={homepage} target="_blank">
                {homepage}
            </Link>
        );
    }
    let fact = null;
    if (textElement || linkElement) {
        fact = (
            <Box>
                <Typography
                    className={headerFont}
                    display='inline'
                    variant='subtitle1'
                >
                    {header}
                </Typography>
                {textElement}
                {linkElement}
            </Box>
        );
    }


    return (
        <React.Fragment>
            {fact}
        </React.Fragment>
    );
};

export default fact;