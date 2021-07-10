import React from 'react';

import {getImageUrl, reactLinks} from "../../../../utils/UrlUtils";
import MyLazyImage from "../../../../UI/MyLazyImage";
import {Paper} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const movie = props => {
    const {poster, alt, onClick, tmdbId, root} = props;

    return (
        <Paper
            className={root}
            component={NavLink} to={`${reactLinks.movieDetailsEndpoint}${tmdbId}`}
        >
            <MyLazyImage
                // className={image}
                src={getImageUrl(poster, false)}
                alt={alt}
                onClick={onClick}
            />
        </Paper>
    );
}

export default movie;