import React from 'react';
import {NavLink} from "react-router-dom";

import {getImageUrl, reactLinks} from "../../../../../../../../utils/UrlUtils";
import {PersonJobType} from "../../../../../../../../utils/Constants";

import {makeStyles} from "@mui/styles";
import {Avatar, createTheme, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

const theme = createTheme();
const _large = {
    width: theme.spacing(9),
    height: theme.spacing(9),
}
const useStyles = makeStyles(() => ({
    actor: {
        paddingLeft: theme.spacing(2),
    }
}));

const actor = (props) => {
    const {id, name, profile_path, character} = props;
    const {actor} = useStyles();

    return (
        <ListItemButton
            // button
            component={NavLink}
            to={`${reactLinks.actorDetailsEndpoint}${id}/type/${PersonJobType.cast}`}
        >
            <ListItemAvatar>
                <Avatar
                    sx={_large}
                    variant="circular"
                    alt={name}
                    src={getImageUrl(profile_path)}
                />
            </ListItemAvatar>
            <ListItemText
                className={actor}
                primary={name}
                secondary={` — as ${character}`}
            />
        </ListItemButton>
    );
}

export default actor;