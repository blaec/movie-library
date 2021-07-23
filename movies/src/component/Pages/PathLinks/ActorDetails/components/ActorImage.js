import React from 'react';

import MyLoader from "../../../../../UI/Spinners/MyLoader";
import MyArrowBack from "../../../../../UI/Buttons/Icons/MyArrowBack";
import {drawer} from "../../../../../utils/Constants";
import {isMovieInCast} from "../../../../../utils/Utils";

import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    actor: {
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(6),
    },
    sticky: {
        position: 'fixed',
        display: 'flex',
        // marginTop: -10,
        zIndex: 2,
        backgroundColor: '#5c6bc0',
        height: 50,
        color: 'white',
        width: '100%',
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
    const {sticky, actor} = useStyles();

    let elem = <MyLoader/>;
    if (name !== undefined) {
        const moviesSize = movies
            .filter(movie => isMovieInCast(moviesInCollection, movie.tmdbId))
            .reduce(((sum, movie) => sum + movie.size), 0);
        elem = (
            <div className={sticky}>
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