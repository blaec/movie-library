import React from 'react';

import {NA_Safe, playTime, releaseDateYear} from "../../../../../../utils/Utils";

import {Box, Divider, makeStyles, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";

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
    const {
        omdbDetails: {Rated, imdbRating, imdbVotes},
        tmdbDetails: {release_date, runtime, title},
        genreDetails
    } = props;
    const {root, titleFont, metaFont, locationFont, genreFont} = useStyles();

    const {
        movieToInfoComponent: {resolution, size, location} = {movieToInfoComponent: {}}
    } = useSelector(state => state.collection.selectedMovie);

    const metadata = {
        rated: NA_Safe(Rated),
        release_date: releaseDateYear(release_date),
        runtime: runtime !== 0
            ? playTime(runtime)
            : null,
        rating: NA_Safe(imdbRating, `${imdbRating} <${imdbVotes}>`),
        resolution: resolution || null,
        fileSize: size
            ? `${size}Gb`
            : null
    };

    return (
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
                    {genreDetails}
                </Box>
            </Typography>
        </div>
    );
};

export default infoGeneral;