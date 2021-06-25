import React from "react";

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

    return (
        <Toolbar>
            <Typography
                className={title}
                color="primary"
                variant="h5"
            >
                Last week's upload history
            </Typography>
        </Toolbar>
    );
};

export default enhancedTableToolbar;