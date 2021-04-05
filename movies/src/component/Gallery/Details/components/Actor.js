import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import {getImageUrl} from "../../../../utils/UrlUtils";

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
    const classes = useStyles();

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar variant="circular"
                        alt={props.name}
                        src={getImageUrl(props.profile_path)}
                        className={classes.large}
                />
            </ListItemAvatar>
            <ListItemText className={classes.actor}
                          primary={props.name}
                          secondary={` — as ${props.character}`}
            />
        </ListItem>
    );
}

export default actor;