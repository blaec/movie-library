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

    return (
        <React.Fragment>
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
            {/*<Box fontSize="subtitle1.fontSize"*/}
            {/*     fontWeight="fontWeightBold">*/}
            {/*    {header}*/}
            {/*</Box>*/}
            {/*<Box fontSize="subtitle2.fontSize"*/}
            {/*     fontWeight="fontWeightLight">*/}
            {/*    {text}*/}
            {/*</Box>*/}
        </React.Fragment>
    );
};

export default fact;