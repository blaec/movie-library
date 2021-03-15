import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {getImageUrl} from "../../../../utils/UrlUtils";

const actor = (props) => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={props.name} src={getImageUrl(props.profile_path)} />
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                        >
                            {props.name}
                        </Typography>
                        {" — as " + props.character}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default actor;