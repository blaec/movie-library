import React from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {getImageUrl} from "../../../../utils/UrlUtils";

const actor = (props) => {
    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant="rounded" alt={props.name} src={getImageUrl(props.profile_path)}/>
                </ListItemAvatar>
                <ListItemText
                    primary={props.name}
                    secondary={" — as " + props.character}
                />
            </ListItem>
            <Divider/>
        </React.Fragment>
    );
}

export default actor;