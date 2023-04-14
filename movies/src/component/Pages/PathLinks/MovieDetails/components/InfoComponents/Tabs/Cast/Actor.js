import React from 'react';
import {NavLink} from "react-router-dom";

import {getImageUrl, reactLinks} from "../../../../../../../../utils/UrlUtils";
import {PersonJobType} from "../../../../../../../../utils/Constants";

import {Avatar, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@mui/material";

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
    const {id, name, profile_path, character} = props;
    const {large, actor} = useStyles();

    return (
        <ListItem
            button
            component={NavLink}
            to={`${reactLinks.actorDetailsEndpoint}${id}/type/${PersonJobType.cast}`}
        >
            <ListItemAvatar>
                <Avatar
                    variant="circular"
                    alt={name}
                    src={getImageUrl(profile_path)}
                    className={large}
                />
            </ListItemAvatar>
            <ListItemText
                className={actor}
                primary={name}
                secondary={` — as ${character}`}
            />
        </ListItem>
    );
}

export default actor;