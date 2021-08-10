import React from 'react';
import {useSelector} from "react-redux";

import {drawerWidth, fullTitle, isArraysExist, isObjectExist} from "../../../../../../utils/Utils";
import {getImageUrl} from "../../../../../../utils/UrlUtils";

import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
    root: {
        objectFit: 'scale-down',
        objectPosition: 'top',
    }
}));

const aspect_ratio = 16 / 9;

const images = () => {
    const {root} = useStyles();
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    const marginBorders = (window.innerHeight < window.innerWidth)
        ? window.innerWidth > 1000 ? .5 : .8
        : 1;
    const windowWidth = (window.innerWidth - drawerWidth(window.innerWidth)) * marginBorders;

    let backdropImages = <React.Fragment>
        <Skeleton
            animation="wave"
            variant="rect"
            height={windowWidth / aspect_ratio}
        />
        <Skeleton
            animation="wave"
            variant="text"
            width='40%'
            style={{margin: 'auto'}}
        />
    </React.Fragment>
    if (isObjectExist(tmdbMovieDetails)) {
        const {title, releaseDate, images: {backdrops}, poster_path} = tmdbMovieDetails;
        const backdropsData = isArraysExist(backdrops)
            ? backdrops
            : [{
                file_path: poster_path
            }];
        backdropImages = backdropsData.map((backdrop, idx) => {
            const {file_path} = backdrop;
            const height = parseInt(windowWidth / aspect_ratio, 0);
            const width = parseInt(windowWidth, 0);
            const path = file_path !== null
                ? getImageUrl(file_path)
                : `https://via.placeholder.com/${width}x${height}.png?text=${title}`;
            return (
                <img
                    key={idx + 1}
                    className={root}
                    height={height}
                    width='100%'
                    src={path}
                    alt={`${fullTitle(title, releaseDate)}`}
                />
            );
        });
    }

    return backdropImages;
};

export default images;