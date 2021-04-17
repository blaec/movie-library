import React from 'react';

import {getImageUrl} from "../../../../utils/UrlUtils";

import {Avatar, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    actor: {
        paddingLeft: theme.spacing(2),
    }
}));

const actor = (props) => {
    const {name, profile_path, character} = props;
    const classes = useStyles();

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar variant="circular"
                        alt={name}
                        src={getImageUrl(profile_path)}
                        className={classes.large}
                />
            </ListItemAvatar>
            <ListItemText className={classes.actor}
                          primary={name}
                          secondary={` — as ${character}`}
            />
        </ListItem>
    );
}

export default actor;