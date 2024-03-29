import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {forceCheck} from "react-lazyload";
import {useTranslation} from "react-i18next";

import Movie from "./components/Movie";
import {drawerWidth, fullTitle, isArrayExist, isStringExist} from "../../../utils/Utils";
import {grid, Language} from "../../../utils/Constants";
import {infiniteLoadPage, language, scrollLocation, scrollPosition} from "../../../store/localStorage/actions";
import {feedbackActions} from "../../../store/state/feedback/feedback-slice";
import ScrollTop from "./components/ScrollTop";
import {isInfiniteLoading, reactLinks} from "../../../utils/UrlUtils";
import {appendAnticipated, appendNowPlaying, appendTopRated} from "../../../store/state/collection/collection-actions";

import {makeStyles} from "@material-ui/core/styles";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Fab} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    grid: screenWidth => {
        const imagesSpaceWidthPerHeightRatio = (screenWidth - drawerWidth(window.innerWidth)) * 1.5;
        return {
            [theme.breakpoints.up(grid.g2.resolution)]: {
                width: `calc(100% / ${grid.g2.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g2.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g3.resolution)]: {
                width: `calc(100% / ${grid.g3.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g3.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g4.resolution)]: {
                width: `calc(100% / ${grid.g4.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g4.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g5.resolution)]: {
                width: `calc(100% / ${grid.g5.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g5.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g6.resolution)]: {
                width: `calc(100% / ${grid.g6.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g6.moviesPerRow})`,
            },
            [theme.breakpoints.up(grid.g7.resolution)]: {
                width: `calc(100% / ${grid.g7.moviesPerRow})`,
                height: `calc(${imagesSpaceWidthPerHeightRatio}px / ${grid.g7.moviesPerRow})`,
            },
        }
    },
}));
const infiniteLoading =
    {
        [reactLinks.topRated]: (tmdbApi, lastPage) => appendTopRated(tmdbApi, lastPage + 1),
        [reactLinks.nowPlaying]: (tmdbApi, lastPage) => appendNowPlaying(tmdbApi, lastPage + 1),
        [reactLinks.anticipated]: (tmdbApi, lastPage) => appendAnticipated(tmdbApi, lastPage + 1),
    };


const gallery = (props) => {
    let {movies} = props;
    const {root, grid} = useStyles(document.body.clientWidth);
    const {pathname} = useLocation();
    const {t} = useTranslation('common');

    const {search} = useSelector(state => state.filter.search);
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const dispatch = useDispatch();

    const [displayedMovieList, setDisplayedMovieList] = useState([]);

    let lastMovieElementRef;
    if (isInfiniteLoading(pathname)) {
        const observer = useRef();
        lastMovieElementRef = useCallback(node => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (hasTmdbApi && entries[0].isIntersecting) {
                    let lastPage = infiniteLoadPage.get();
                    dispatch(infiniteLoading[pathname](tmdbApi, lastPage));
                    infiniteLoadPage.set(lastPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        }, []);
    }

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
            <div className={root}>
                {displayedMovieList.map((movie, index) => {
                        const {id, tmdbId, posterPath, posterPathRu, title, releaseDate} = movie;
                        const poster = language.get() === Language.english
                            ? posterPath
                            : isStringExist(posterPathRu) ? posterPathRu : posterPath;
                        const elementRef = displayedMovieList.length === index + 1
                            ? lastMovieElementRef
                            : null;

                        return (
                            <Movie
                                key={id}
                                movieRef={elementRef}
                                root={grid}
                                tmdbId={tmdbId}
                                poster={poster}
                                alt={`${fullTitle(title, releaseDate)}`}
                                onClick={handleViewMovieDetails}
                            />
                        );
                    }
                )}
            </div>
            <ScrollTop {...props}>
                <Fab size="small">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
};

export default gallery;