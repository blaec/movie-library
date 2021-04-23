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
    const {id, name, profile_path, character, onActorSelect} = props;
    const {large, actor} = useStyles();

    return (
        <ListItem onClick={() => onActorSelect(id, name)}>
            <ListItemAvatar>
                <Avatar variant="circular"
                        alt={name}
                        src={getImageUrl(profile_path)}
                        className={large}
                />
            </ListItemAvatar>
            <ListItemText className={actor}
                          primary={name}
                          secondary={` — as ${character}`}
            />
        </ListItem>
    );
}

export default actor;