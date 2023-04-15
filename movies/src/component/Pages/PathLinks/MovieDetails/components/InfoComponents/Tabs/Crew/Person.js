import React from 'react';
import {NavLink} from "react-router-dom";

import {getImageUrl, reactLinks} from "../../../../../../../../utils/UrlUtils";
import {PersonJobType} from "../../../../../../../../utils/Constants";

import {makeStyles} from "@mui/styles";
import {Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    actor: {
        paddingLeft: theme.spacing(2),
    }
}));

const person = (props) => {
    const {id, name, profile_path, job} = props;
    const {large, actor} = useStyles();

    return (
        <ListItemButton
            component={NavLink}
            to={`${reactLinks.actorDetailsEndpoint}${id}/type/${PersonJobType.crew}`}
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
                secondary={` — as ${job}`}
            />
        </ListItemButton>
    );
}

export default person;