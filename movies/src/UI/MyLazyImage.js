import React from "react";
import LazyLoad from "react-lazyload";

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

    let errImage = `https://via.placeholder.com/500x750.png?text=${alt}`;
    return (
        <div className={imageWrapper}>
            <LazyLoad
                once
                offset={200}
            >
                <img
                    className={styledImage}
                    src={src}
                    alt={alt}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = errImage
                    }}
                    onClick={onClick}
                />
            </LazyLoad>
        </div>
    );
};

export default myLazyImage;