import React from 'react';
import {Avatar, CardMedia, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import {getImageUrl} from "../../../utils/UrlUtils";
import {year} from "../../../utils/Utils";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    actor: {
        paddingLeft: theme.spacing(2),
    }
}));

const actorMovie = (props) => {
    const {title, release_date, poster_path, character} = props;
    const classes = useStyles();

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar variant="square"
                        alt={title}
                        src={getImageUrl(poster_path)}
                        className={classes.large}
                />
            </ListItemAvatar>
            <ListItemText className={classes.actor}
                          primary={`${title} (${year(release_date)})`}
                          secondary={` — as ${character}`}
            />
        </ListItem>
    );
};

export default actorMovie;