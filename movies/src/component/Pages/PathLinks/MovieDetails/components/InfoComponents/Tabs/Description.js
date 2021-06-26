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
    const {details: {tagline, overview, Plot}} = props;
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
                {overview || Plot || `No description available`}
            </Typography>
            <iframe
                width="100%"
                height="480"
                src={`https://www.youtube.com/embed/YLE85olJjp8`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </React.Fragment>
    );
};

export default description;