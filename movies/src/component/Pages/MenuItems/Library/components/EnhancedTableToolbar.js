import React from "react";
import {useTranslation} from "react-i18next";

import {makeStyles} from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 900,
        fontFamily: ['Truculenta', "!important"]
    },
}));

const enhancedTableToolbar = () => {
    const {title} = useStyles();
    const {t} = useTranslation('common');

    return (
        <Toolbar>
            <Typography
                className={title}
                color="primary"
                variant="h5"
            >
                {t('text.movieLibrary')}
            </Typography>
        </Toolbar>
    );
};

export default enhancedTableToolbar;