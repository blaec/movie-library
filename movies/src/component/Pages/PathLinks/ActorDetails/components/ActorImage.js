import React from 'react';

import MyArrowBack from "../../../../../UI/Buttons/Icons/MyArrowBack";
import {drawer} from "../../../../../utils/Constants";
import {isMovieInCast} from "../../../../../utils/Utils";
import MyRectSkeleton from "../../../../../UI/Skeleton/MyRectSkeleton";

import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    actor: {
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(6),
    },
    skeleton: {
        display: 'flex',
        height: 50,
        width: '100%',
    },
    sticky: {
        position: 'fixed',
        zIndex: 2,
        backgroundColor: '#5c6bc0',
        color: 'white',
        [`@media (orientation:landscape)`]: {
            width: `calc(80% - ${drawer.width * .8}px)`,
        },
        [`${theme.breakpoints.up(1000)} and (orientation:landscape)`]: {
            width: `calc(50% - ${drawer.width * .5}px)`,
        },
    },
}));

const actorImage = (props) => {
    const {movies, actorDetails: {name}, movieList, moviesInCollection, onClose} = props;
    const {sticky, skeleton, actor} = useStyles();

    let elem = <MyRectSkeleton className={skeleton}/>;
    if (name !== undefined) {
        const moviesSize = movies
            .filter(movie => isMovieInCast(moviesInCollection, movie.tmdbId))
            .reduce(((sum, movie) => sum + movie.size), 0);
        elem = (
            <div className={`${sticky} ${skeleton}`}>
                <MyArrowBack onClose={onClose}/>
                <Typography className={actor}
                            variant="h6">
                    {`${name} (${moviesInCollection.length}/${movieList.length}) - ${moviesSize.toFixed(0)}Gb`}
                </Typography>
            </div>
        );
    }

    return (
        <React.Fragment>
            {elem}
        </React.Fragment>
    );
};

export default actorImage;