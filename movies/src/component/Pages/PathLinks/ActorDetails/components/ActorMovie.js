import React from 'react';
import {NavLink} from "react-router-dom";

import {getImageUrl, posterSizes, reactLinks} from "../../../../../utils/UrlUtils";
import {isStringExist, fullYear} from "../../../../../utils/Utils";

import {makeStyles} from "@mui/styles";
import {Box, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper} from "@mui/material";

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
        fontFamily: ['Oswald', "!important"],
    },
}));

const actorMovie = (props) => {
    const {id, title, release_date, poster_path, character, job, exist} = props;
    const {actor, image, imageSize, movieExist, titleFont} = useStyles();

    // TODO image size hardcoded
    let errImage = `https://via.placeholder.com/80x120.png?text=${title.substring(0, 1)}`;
    let characterText = null;
    if (isStringExist(character)) {
        characterText = ` — as ${character}`;
    } else if (isStringExist(job)) {
        characterText = ` — as ${job}`;
    }
    return (
        <ListItemButton
            component={NavLink} to={`${reactLinks.movieDetailsEndpoint}${id}`}
            className={exist ? movieExist : null}
        >
            <ListItemAvatar>
                <Paper
                    elevation={3}
                    className={imageSize}
                    style={{backgroundImage: `url("${errImage}")`}}
                >
                    <img
                        className={`${image} ${imageSize}`}
                        src={getImageUrl(poster_path, posterSizes.w342)}
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
                    {fullYear(release_date)}
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
        </ListItemButton>
    );
};

export default actorMovie;