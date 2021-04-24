import React from 'react';

import {NA_Safe, playTime, releaseDateYear} from "../../../../../utils/Utils";

import {Box, Divider, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 10px',
    },
}));

const infoGeneral = (props) => {
    const {
        omdbDetails: {Rated, imdbRating, imdbVotes},
        tmdbDetails: {release_date, runtime, title},
        fileDetails: {resolution, size, location},
        genreDetails
    } = props;
    const {root} = useStyles();

    const metadata = {
        rated: NA_Safe(Rated),
        release_date: releaseDateYear(release_date),
        runtime: runtime !== 0
            ? playTime(runtime)
            : null,
        rating: NA_Safe(imdbRating, `${imdbRating} [${imdbVotes}]`),
        resolution: resolution,
        fileSize: size
            ? `${size}Gb`
            : null
    };

    return (
        <div className={root}>
            <Typography component="div">
                <Box fontSize="caption.fontSize"
                     fontWeight="fontWeightLight">
                    {location}
                </Box>
                <Divider/>
                <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightRegular"
                     textAlign="center"
                     paddingTop={1}
                >
                    {Object.values(metadata)
                        .filter(val => val !== null)
                        .join(` | `)}
                </Box>
                <Box fontSize="h4.fontSize" fontWeight="fontWeightBold" textAlign="center">
                    {title}
                </Box>
                <Box fontSize="subtitle2.fontSize"  fontWeight="fontWeightMedium" textAlign="center">
                    {genreDetails}
                </Box>
            </Typography>
        </div>
    );
};

export default infoGeneral;