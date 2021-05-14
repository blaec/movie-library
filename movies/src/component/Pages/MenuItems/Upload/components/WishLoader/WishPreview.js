import React from 'react';

import {getImageUrl} from "../../../../../../utils/UrlUtils";
import {fullTitle} from "../../../../../../utils/Utils";

import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    image: isPreview => {
        return {
            width: 200,
            height: 300,
            margin: 'auto',
            marginBottom: theme.spacing(isPreview ? 3.7 : 1),
        }
    },
    imageFit: {
        width: 'inherit',
        height: 'inherit',
    },
}));

const wishPreview = (props) => {
    const {title, release_date, poster_path} = props;
    const {image, imageFit} = useStyles(title === undefined);

    let errImage = `https://via.placeholder.com/1000x1500.png?text=${fullTitle(title || 'Preview', release_date)}`;
    return (
        <Paper className={image}
               style={{backgroundImage: `url("${errImage}")`}}
               elevation={3}>
            <img className={imageFit}
                 src={getImageUrl(poster_path)}
                 onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = errImage
                 }}
                 alt=''/>
        </Paper>
    );
};

export default wishPreview;