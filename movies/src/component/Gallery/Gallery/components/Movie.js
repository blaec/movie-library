import React from 'react';
import {NavLink} from "react-router-dom";

import {getImageUrl, posterSizes, reactLinks} from "../../../../utils/UrlUtils";
import MyLazyImage from "../../../../UI/MyLazyImage";

import {Paper} from "@material-ui/core";


const movie = props => {
    const {poster, alt, tmdbId, onClick, root, movieRef} = props;


    return (
        <Paper
            className={root}
            ref={movieRef}
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