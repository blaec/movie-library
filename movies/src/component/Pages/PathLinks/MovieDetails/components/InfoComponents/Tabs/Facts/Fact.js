import React from 'react';

import {Box, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


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

    const textElement = text
        ? (
            <Typography className={textFont}
                        display='inline'
                        variant='subtitle1'>
                {text}
            </Typography>
        )
        : null;
    const linkElement = homepage
        ? (
            <Link href={homepage} target="_blank">
                {homepage}
            </Link>
        )
        : null;
    const fact = text || homepage
        ? (
            <Box>
                <Typography className={headerFont}
                            display='inline'
                            variant='subtitle1'>
                    {header}
                </Typography>
                {textElement}
                {linkElement}
            </Box>
        )
        : null;
    return (
        <React.Fragment>
            {fact}
        </React.Fragment>
    );
};

export default fact;