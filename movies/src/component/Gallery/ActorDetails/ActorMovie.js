import React from 'react';

import {getImageUrl} from "../../../utils/UrlUtils";
import {year} from "../../../utils/Utils";

import {Box, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    actor: {
        paddingLeft: theme.spacing(2),
    },
    image: {
        width: 80,
        height: 120,
    },
    movieExist: {
        backgroundColor: 'lightgoldenrodyellow'
    }
}));

const actorMovie = (props) => {
    const {title, release_date, poster_path, character, exist} = props;
    const {actor, image, movieExist} = useStyles();

    // TODO image size hardcoded
    return (
        <ListItem className={exist ? movieExist : null}>
            <ListItemAvatar>
                <Paper elevation={3}
                       className={image}
                       style={{backgroundImage: `url("https://via.placeholder.com/80x120.png?text=${title.substring(0, 1)}")`}}>
                    <img src={getImageUrl(poster_path)} alt=""/>
                </Paper>
            </ListItemAvatar>
            <ListItemText className={actor}>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightLight"
                     color="text.secondary">
                    {year(release_date)}
                </Box>
                <Box fontSize="h5.fontSize"
                     fontWeight="fontWeightBold">
                    {title}
                </Box>
                <Box fontSize="body1.fontSize"
                     fontWeight="fontWeightLight"
                     color="text.disabled">
                    {` — as ${character}`}
                </Box>
            </ListItemText>
        </ListItem>
    );
};

export default actorMovie;