import React from 'react';
import {useSelector} from "react-redux";

import MyLoader from "../../../../../../UI/Spinners/MyLoader";
import {getMovieByTmdbId, isArrayExist, joinNames, isSafe, playTime, fullYear} from "../../../../../../utils/Utils";

import {Box, Divider, makeStyles, Typography} from "@material-ui/core";
import {useParams} from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    titleFont: {
        fontFamily: ['Russo One', "!important"],
        textShadow: '1px 2px 4px #333',
    },
    metaFont: {
        fontFamily: ['Antonio', "!important"],
    },
    locationFont: {
        fontFamily: ['Chakra Petch', "!important"],
    },
    genreFont: {
        fontFamily: ['Andika', "!important"],
    },
}));

const infoGeneral = (props) => {
    const {details: {Rated, imdbRating, imdbVotes, release_date, runtime, title, genres} = {details: {}},} = props;
    const {movieTmdbId} = useParams();
    const {root, titleFont, metaFont, locationFont, genreFont} = useStyles();

    const movies = useSelector(state => state.collection.movies);

    let generalInfo = <MyLoader/>
    if (isArrayExist(movies)) {
        let {resolution, size, location} = getMovieByTmdbId(movies, movieTmdbId);
        let metadata = {
            rated: isSafe(Rated),
            release_date: isSafe(fullYear(release_date)),
            runtime: runtime !== 0
                ? playTime(runtime)
                : null,
            rating: isSafe(imdbRating, `${imdbRating} <${imdbVotes}>`),
            resolution: resolution || null,
            fileSize: size
                ? `${size}Gb`
                : null
        };

        generalInfo = (
            <div className={root}>
                <Typography component="div">
                    <Box
                        className={locationFont}
                        fontSize="caption.fontSize"
                    >
                        {location}
                    </Box>
                    <Divider/>
                    <Box
                        className={metaFont}
                        fontSize="subtitle2.fontSize"
                        textAlign="center"
                        paddingTop={1}
                    >
                        {Object.values(metadata)
                            .filter(val => val !== null)
                            .join(` | `)}
                    </Box>
                    <Box
                        className={titleFont}
                        fontSize="h4.fontSize"
                        textAlign="center"
                    >
                        {title}
                    </Box>
                    <Box
                        className={genreFont}
                        fontSize="subtitle1.fontSize"
                        textAlign="center"
                    >
                        {joinNames(genres)}
                    </Box>
                </Typography>
            </div>
        );
    }

    return (
        <React.Fragment>
            {generalInfo}
        </React.Fragment>
    );
};

export default infoGeneral;