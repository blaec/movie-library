import React from 'react';
import {ListItem, ListItemAvatar, ListItemText, makeStyles, Paper} from "@material-ui/core";
import {getImageUrl} from "../../../utils/UrlUtils";
import {year} from "../../../utils/Utils";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    actor: {
        paddingLeft: theme.spacing(2),
    },
    image: {
        width: 80,
        height: 120
    }
}));

const actorMovie = (props) => {
    const {title, release_date, poster_path, character} = props;
    const classes = useStyles();

    // TODO image size hardcoded
    return (
        <ListItem>
            <ListItemAvatar>
                <Paper elevation={3}
                       className={classes.image}
                     style={{backgroundImage: `url("https://via.placeholder.com/80x120.png?text=${title.substring(0, 1)}")`}}>
                    <img src={getImageUrl(poster_path)}
                         alt=""
                         width={80}
                    />
                </Paper>
            </ListItemAvatar>
            <ListItemText className={classes.actor}
                          primary={`${title} (${year(release_date)})`}
                          secondary={` — as ${character}`}
            />
        </ListItem>
    );
};

export default actorMovie;