import React from 'react';
import {useTranslation} from "react-i18next";

import {Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

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
    const {t} = useTranslation('common');

    return (
        <React.Fragment>
            <Typography
                className={taglineFont}
                variant='h5'
            >
                {tagline}
            </Typography>
            <Typography variant='body1'>
                {overview || Plot || `${t('helperText.noDescriptionAvailable')}`}
            </Typography>
        </React.Fragment>
    );
};

export default description;