import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {forceCheck} from "react-lazyload";
import {useTranslation} from "react-i18next";

import Movie from "./components/Movie";
import {fullTitle, isArrayExist, isStringExist} from "../../../utils/Utils";
import {Language} from "../../../utils/Constants";
import {language, scrollLocation, scrollPosition} from "../../../store/localStorage/actions";
import {feedbackActions} from "../../../store/state/feedback/feedback-slice";
import ScrollTop from "./components/ScrollTop";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Box, Fab} from "@mui/material";

const _display = {
    display: 'flex',
    flexWrap: 'wrap',
};


const gallery = (props) => {
    let {movies} = props;
    const {pathname} = useLocation();
    const {t} = useTranslation('common');

    const {search} = useSelector(state => state.filter.search);
    const dispatch = useDispatch();

    const [displayedMovieList, setDisplayedMovieList] = useState([]);

    const handleViewMovieDetails = () => {
        scrollPosition.set(window.scrollY);
        scrollLocation.set(pathname);
    };

    useEffect(() => {
        const previousPathname = scrollLocation.get();
        if (previousPathname === pathname) {
            const identifier = setTimeout(() => {
                window.scrollBy({top: scrollPosition.get(), left: 0, behavior: 'auto'});
                scrollPosition.remove();
                scrollLocation.remove();
            }, 2);

            return () => {
                clearTimeout(identifier);
            };
        }
    }, []);

    useEffect(() => {
        // For some reason forceCheck() only works inside timeout even with timeout = 0
        const identifier = setTimeout(() => {
            const filteredMovies = Object.values(movies).filter(movie => movie.title.toLowerCase().includes(search));
            setDisplayedMovieList(filteredMovies);
            if (filteredMovies.length < movies.length) {
                const message = isArrayExist(filteredMovies)
                    ? `${t('snackbar.filteredMovies', {count: filteredMovies.length})}`
                    : `${t('snackbar.noResult')}`;
                const type = isArrayExist(filteredMovies) ? 'info' : 'warning';
                dispatch(feedbackActions.setSnackbar({message, type}));

                // Manually trigger checking for elements in viewport.
                forceCheck();
            }
        }, 0);

        return () => clearTimeout(identifier);
    }, [search, movies]);


    return (
        <React.Fragment>
            <Box sx={_display}>
                {displayedMovieList.map(movie => {
                        const {id, tmdbId, posterPath, posterPathRu, title, releaseDate} = movie;
                        const poster = language.get() === Language.english
                            ? posterPath
                            : isStringExist(posterPathRu) ? posterPathRu : posterPath;
                        return (
                            <Movie
                                key={id}
                                tmdbId={tmdbId}
                                poster={poster}
                                alt={`${fullTitle(title, releaseDate)}`}
                                onClick={handleViewMovieDetails}
                            />
                        )
                    }
                )}
            </Box>
            <ScrollTop {...props}>
                <Fab size="small">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
};

export default gallery;