import React from 'react';

import {Box, Typography} from "@material-ui/core";
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
    const {header, text} = props;
    const {headerFont, textFont} = useStyles();

    const fact = text
        ? (
            <Box>
                <Typography className={headerFont}
                            display='inline'
                            variant='subtitle1'>
                    {header}
                </Typography>
                <Typography className={textFont}
                            display='inline'
                            variant='subtitle1'>
                    {text}
                </Typography>
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