import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {fullYear, getMovieByTmdbId, isObjectExist, isSafe, joinNames, playTime} from "../../../../../../utils/Utils";
import {feedbackActions} from "../../../../../../store/state/feedback/feedback-slice";

import {Box, Divider, makeStyles, Typography} from "@mui/material";
import {updateMovieGenres} from "../../../../../../store/state/collection/collection-actions";


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
    const {genreResults, isGenreResultsLoaded} = useSelector(state => state.collection.genreResults);
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    let selectedMovie = getMovieByTmdbId(movies, movieTmdbId);
    let {resolution, size, location, fileName, genres : dbGenres} = selectedMovie;
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
        let canUpdateGenres = hasGenreMismatch && isObjectExist(selectedMovie);
        if (canUpdateGenres) {
            const updatedMovie = {
                ...selectedMovie,
                genres: genres.map(genre => ({...genre, genreId: genre.id, id: null}))
            }
            dispatch(updateMovieGenres(updatedMovie));
        }
    }, [hasGenreMismatch])

    useEffect(() => {
        if (isGenreResultsLoaded) {
            const {message, success} = genreResults;
            const type = success ? 'success' : 'error';
            onSetSnackbar({message, type});
        }
    }, [genreResults]);

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