import React, {useRef} from "react";
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
    placeholder: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        animation: `$loadingAnimation 1s infinite`,
    },
    "@keyframes loadingAnimation": {
        "0%": {
            backgroundColor: '#fff',
        },
        "50%": {
            backgroundColor: '#ccc',
        },
        "100%": {
            backgroundColor: '#fff',
        }
    },
}));

const myLazyImage = (props) => {
    const {src, alt, onClick} = props;
    const {imageWrapper, placeholder, styledImage} = useStyles();
    const refPlaceholder = useRef();

    const removePlaceholder = () => {
        refPlaceholder.current.remove();
    };

    return (
        <div className={imageWrapper}>
            <div className={placeholder} ref={refPlaceholder} />
            <LazyLoad>
                <img
                    className={styledImage}
                    onLoad={removePlaceholder}
                    onError={removePlaceholder}
                    src={src}
                    alt={alt}
                    onClick={onClick}
                />
            </LazyLoad>
        </div>
    );
};

export default myLazyImage;