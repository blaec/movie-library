import React from 'react';

import {getImageUrl, reactLinks} from "../../../../utils/UrlUtils";
import {grid} from "../../../../utils/Constants";

import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up(grid.g2.resolution)]: {
            width: `calc(100% / ${grid.g2.moviesPerRow})`,
        },
        [theme.breakpoints.up(grid.g3.resolution)]: {
            width: `calc(100% / ${grid.g3.moviesPerRow})`,
        },
        [theme.breakpoints.up(grid.g4.resolution)]: {
            width: `calc(100% / ${grid.g4.moviesPerRow})`,
        },
        [theme.breakpoints.up(grid.g5.resolution)]: {
            width: `calc(100% / ${grid.g5.moviesPerRow})`,
        },
        [theme.breakpoints.up(grid.g6.resolution)]: {
            width: `calc(100% / ${grid.g6.moviesPerRow})`,
        },
        [theme.breakpoints.up(grid.g7.resolution)]: {
            width: `calc(100% / ${grid.g7.moviesPerRow})`,
        },
    },
    image: {
        width: '100%',
        height: '100%',
    },
}));


const movie = props => {
    const {poster, alt, onClick, movieToComponents, movieToComponents: {movieToDetailsComponent: {tmdbId}}} = props;
    const {root, image} = useStyles();

    return (
        <Paper
            className={root}
            component={NavLink} to={`${reactLinks.movieDetailsEndpoint}${tmdbId}`}
        >
            <img
                className={image}
                src={getImageUrl(poster)}
                alt={alt}
                onClick={() => onClick({...movieToComponents})}
            />
        </Paper>
    );
}

export default movie;