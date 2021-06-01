import React from 'react';

import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    taglineFont: {
        fontWeight: 700,
        fontFamily: ['Caveat', "!important"],
        textAlign: 'right',
        margin: theme.spacing(0, 0, 1, '20%'),
    },
}));

const description = (props) => {
    const {details: {tagline, overview}} = props;
    const {taglineFont} = useStyles();

    return (
        <React.Fragment>
            <Typography
                className={taglineFont}
                variant='h5'
            >
                {tagline}
            </Typography>
            <Typography variant='body1'>
                {overview}
            </Typography>
        </React.Fragment>
    );
};

export default description;