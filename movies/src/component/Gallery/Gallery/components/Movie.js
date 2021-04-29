import React from 'react';

import {getImageUrl} from "../../../../utils/UrlUtils";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: `calc(100% / 7)`,
        [theme.breakpoints.down(1700)]: {
            width: `calc(100% / 6)`,
        },
        [theme.breakpoints.down(1300)]: {
            width: `calc(100% / 5)`,
        },
        [theme.breakpoints.down(1000)]: {
            width: `calc(100% / 4)`,
        },
        [theme.breakpoints.down(700)]: {
            width: `calc(100% / 3)`,
        },
        [theme.breakpoints.down(450)]: {
            width: `calc(100% / 2)`,
        },
    },
    image: {
        width: '100%',
        height: '100%',
    },
}));


const movie = props => {
    const {poster, alt, onClick, movieToComponents} = props;
    const {root, image} = useStyles();

    return (
        <div className={root}>
            <img className={image} src={getImageUrl(poster)}
                 onClick={() => onClick({...movieToComponents})}
                 alt={alt}
            />
        </div>
    );
}

export default movie;