import React from "react";
import LazyLoad from "react-lazyload";

import MyLoader from "./Spinners/MyLoader";

import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    styledImage: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'fill',
    },
}));

const myLazyImage = (props) => {
    const {src, alt, onClick} = props;
    const {imageWrapper, styledImage} = useStyles();

    return (
        <div className={imageWrapper}>
            <LazyLoad offset={200}>
                <img
                    className={styledImage}
                    src={src}
                    alt={alt}
                    onClick={onClick}
                />
            </LazyLoad>
        </div>
    );
};

export default myLazyImage;