import React from 'react';
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation('common');

    const errImage = `https://via.placeholder.com/1000x1500.png?text=${fullTitle(title || t('text.preview'), release_date)}`;
    const sourceImage = poster_path
        ? getImageUrl(poster_path)
        : errImage;
    return (
        <Paper
            className={image}
            style={{backgroundImage: `url("${errImage}")`}}
            elevation={3}
        >
            <img
                className={imageFit}
                src={sourceImage}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = errImage
                }}
                alt=''/>
        </Paper>
    );
};

export default wishPreview;
