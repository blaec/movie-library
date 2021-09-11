import React from 'react';
import {makeStyles, Paper, Typography} from "@material-ui/core";
import {ReleaseType} from "../../../../../../../../../utils/Constants";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(.5),
        padding: theme.spacing(1),
        minWidth: theme.spacing(15),
    },
    headerFont: {
        fontWeight: 700,
    },
}));

const release = (props) => {
    const {data : {type, release_date}} = props;
    const {root, headerFont} = useStyles();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };

    return (
        <Paper className={root}>
            <Typography
                className={headerFont}
                display='block'
                variant='subtitle1'
            >
                {ReleaseType[type]}
            </Typography>
            <Typography
                display='block'
                variant='subtitle1'
            >
                {`${new Date(release_date).toLocaleDateString("en-GB", options)}`}
            </Typography>
        </Paper>
    );
};

export default release;