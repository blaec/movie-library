import React from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {getImageUrl} from "../../../../utils/UrlUtils";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    actor: {
        paddingLeft: theme.spacing(2),
    }
}));

const actor = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant="rounded"
                            alt={props.name}
                            src={getImageUrl(props.profile_path)}
                            className={classes.large}
                    />
                </ListItemAvatar>
                <ListItemText
                    className={classes.actor}
                    primary={props.name}
                    secondary={" — as " + props.character}
                />
            </ListItem>
            <Divider/>
        </React.Fragment>
    );
}

export default actor;