import React from "react";
import {useTranslation} from "react-i18next";

import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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