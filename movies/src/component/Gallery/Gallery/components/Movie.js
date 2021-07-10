import React from 'react';

import {getImageUrl, reactLinks} from "../../../../utils/UrlUtils";
import {grid} from "../../../../utils/Constants";
import MyLazyImage from "../../../../UI/MyLazyImage";

import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {drawerWidth} from "../../../../utils/Utils";

const useStyles = makeStyles((theme) => ({
    root: screenWidth => {
        const imagesSpaceWidthPerHeightRatio = (screenWidth - drawerWidth(window.innerWidth)) * 1.5;
        return {
            [theme.breakpoints.up(grid.g2.resolution)]: {
                width: `calc(100% / ${grid.g2.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g2.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g3.resolution)]: {
                width: `calc(100% / ${grid.g3.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g3.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g4.resolution)]: {
                width: `calc(100% / ${grid.g4.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g4.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g5.resolution)]: {
                width: `calc(100% / ${grid.g5.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g5.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g6.resolution)]: {
                width: `calc(100% / ${grid.g6.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g6.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g7.resolution)]: {
                width: `calc(100% / ${grid.g7.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g7.moviesPerRow})`,
            },
        }
    },
    image: {
        width: '100%',
        height: '100%',
    },
}));


const movie = props => {
    const {poster, alt, onClick, tmdbId, root} = props;
    // const {root, image} = useStyles(window.innerWidth);

    return (
        <Paper
            className={root}
            component={NavLink} to={`${reactLinks.movieDetailsEndpoint}${tmdbId}`}
        >
            <MyLazyImage
                // className={image}
                src={getImageUrl(poster)}
                alt={alt}
                // onClick={onClick}
            />
        </Paper>
    );
}

export default movie;