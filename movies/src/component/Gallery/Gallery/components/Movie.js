import React from 'react';
import {NavLink} from "react-router-dom";

import {getImageUrl, posterSizes, reactLinks} from "../../../../utils/UrlUtils";
import MyLazyImage from "../../../../UI/MyLazyImage";
import {drawerWidth} from "../../../../utils/Utils";
import {grid} from "../../../../utils/Constants";

import {createTheme, Paper} from "@mui/material";

const theme = createTheme();
const _grid = () => {
    const screenWidth = document.body.clientWidth;
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
}


const movie = props => {
    const {poster, alt, tmdbId, onClick} = props;


    return (
        <Paper
            sx={_grid}
            component={NavLink}
            to={`${reactLinks.movieDetailsEndpoint}${tmdbId}`}
        >
            <MyLazyImage
                src={getImageUrl(poster, posterSizes.w500)}
                alt={alt}
                onClick={onClick}
            />
        </Paper>
    );
}

export default movie;