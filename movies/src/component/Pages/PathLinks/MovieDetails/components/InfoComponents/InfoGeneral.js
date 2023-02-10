import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {useDispatch} from "react-redux";

import {fullYear, getMovieByTmdbId, isSafe, joinNames, playTime} from "../../../../../../utils/Utils";
import {feedbackActions} from "../../../../../../store/state/feedback/feedback-slice";

import {Box, Divider, makeStyles, Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    titleFont: {
        fontFamily: ['Russo One', "!important"],
        textShadow: '1px 2px 4px #333',
    },
    metaFont: {
        fontFamily: ['Cuprum', "!important"],
    },
    locationFont: {
        fontFamily: ['Chakra Petch', "!important"],
    },
    fileNameFont: {
        fontWeight: 700,
        fontFamily: ['Chakra Petch', "!important"],
    },
    genreFont: {
        fontFamily: ['Andika', "!important"],
    },
}));

const infoGeneral = (props) => {
    const {movies, details: {Rated, imdbRating, imdbVotes, release_date, runtime, title, genres} = {details: {}},} = props;
    const {movieTmdbId} = useParams();
    const {root, titleFont, metaFont, locationFont, fileNameFont, genreFont} = useStyles();

    const dispatch = useDispatch();

    let {resolution, size, location, fileName, genres : dbGenres} = getMovieByTmdbId(movies, movieTmdbId);
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
    const dbGenresIds = dbGenres ? dbGenres.map(genre => genre.genreId).sort().join(",") : "";
    const apiGenreIds = genres.map(genre => genre.id).sort().join(",");
    const hasGenreMismatch = dbGenres && dbGenresIds !== apiGenreIds;
    useEffect(() => {
        if (hasGenreMismatch) {
            dispatch(feedbackActions.setSnackbar({
                message: `Detected genre mismatch db: ${dbGenresIds} vs api: ${apiGenreIds}`,
                type: 'warning'
            }));
        }
    }, [hasGenreMismatch])


    const generalInfo = (
        <div className={root}>
            <Typography component="div">
                <Box
                    className={locationFont}
                    fontSize="caption.fontSize"
                >
                    {location}
                </Box>
                <Box
                    className={fileNameFont}
                    fontSize="caption.fontSize"
                >
                    {fileName}
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

    return (
        <React.Fragment>
            {generalInfo}
        </React.Fragment>
    );
};

export default infoGeneral;