import React from 'react';
import {useSelector} from "react-redux";

import MyLoader from "../../../../../../UI/Spinners/MyLoader";
import {drawerWidth, fullTitle, isArraysExist, isObjectExist} from "../../../../../../utils/Utils";
import {getImageUrl, posterSizes} from "../../../../../../utils/UrlUtils";

import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        objectFit: 'scale-down',
    }
}));

const images = () => {
    const {root} = useStyles();
    const tmdbMovieDetails = useSelector(state => state.details.movieTmdbDetails);
    console.log("render images");
    const marginBorders = (window.innerHeight < window.innerWidth)
        ? window.innerWidth > 1000 ? .5 : .8
        : 1;
    const windowWidth = (window.innerWidth - drawerWidth(window.innerWidth)) * marginBorders;

    let backdropImages = <MyLoader/>
    if (isObjectExist(tmdbMovieDetails)) {
        console.log(`isObjectExist(tmdbMovieDetails) ${new Date().getTime()}`);
        const {title, releaseDate, images: {backdrops}, poster_path} = tmdbMovieDetails;
        const backdropsData = isArraysExist(backdrops)
            ? backdrops
            : [{
                aspect_ratio: 16 / 9,
                file_path: poster_path

            }];
        backdropImages = backdropsData.map((backdrop, idx) => {
            const {aspect_ratio, file_path} = backdrop;
            const height = parseInt(windowWidth / aspect_ratio, 0);
            const width = parseInt(windowWidth, 0);
            const path = file_path !== null
                ? getImageUrl(file_path, posterSizes.w780)
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