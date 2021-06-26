import React from 'react';

import {getImageUrl, reactLinks} from "../../../../../utils/UrlUtils";
import {isStringExist, releaseDateYear} from "../../../../../utils/Utils";

import {Box, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    actor: {
        paddingLeft: theme.spacing(2),
    },
    image: {
        objectFit: 'cover',
    },
    imageSize: {
        width: 80,
        height: 120,
    },
    movieExist: {
        backgroundColor: '#3f51b540',
        // boxShadow: '0px 3px 15px #3f51b540, 0px -3px 15px #3f51b540'
    },
    titleFont: {
        fontWeight: 500,
        fontFamily: ['Teko', "!important"],
    },
}));

const actorMovie = (props) => {
    const {id, title, release_date, poster_path, character, exist} = props;
    const {actor, image, imageSize, movieExist, titleFont} = useStyles();

    // TODO image size hardcoded
    let errImage = `https://via.placeholder.com/80x120.png?text=${title.substring(0, 1)}`;
    let characterText = null;
    if (isStringExist(character)) {
        characterText = ` — as ${character}`;
    }
    return (
        <ListItem className={exist ? movieExist : null}>
            <ListItemAvatar>
                <Paper
                    // TODO need to save selectedMovieId to delete correct movie
                    component={NavLink} to={`${reactLinks.movieDetailsEndpoint}${id}`}
                    elevation={3}
                    className={imageSize}
                    style={{backgroundImage: `url("${errImage}")`}}
                >
                    <img
                        className={`${image} ${imageSize}`}
                        src={getImageUrl(poster_path)}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = errImage
                        }}
                        alt=""/>
                </Paper>
            </ListItemAvatar>
            <ListItemText className={actor}>
                <Box
                    fontSize="subtitle1.fontSize"
                    fontWeight="fontWeightLight"
                    color="text.secondary"
                >
                    {releaseDateYear(release_date)}
                </Box>
                <Box
                    className={titleFont}
                    fontSize="h5.fontSize"
                >
                    {title}
                </Box>
                <Box
                    fontSize="body1.fontSize"
                    fontWeight="fontWeightLight"
                    color="text.disabled"
                >
                    {characterText}
                </Box>
            </ListItemText>
        </ListItem>
    );
};

export default actorMovie;