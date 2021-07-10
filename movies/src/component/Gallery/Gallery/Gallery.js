import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";

import Movie from "./components/Movie";
import {drawerWidth, fullTitle, isArrayExist} from "../../../utils/Utils";
import {delay, grid} from "../../../utils/Constants";
import {lastLocation, scrollPosition} from "../../../store/localStorage/actions";
import {feedbackActions} from "../../../store/state/feedback/feedback-slice";
import {makeStyles} from "@material-ui/core/styles";

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


const gallery = (props) => {
    let {movies} = props;
    const {root, grid} = useStyles(document.body.clientWidth);
    const {pathname} = useLocation();

    const search = useSelector(state => state.filter.search);
    const dispatch = useDispatch();

    const [displayedMovieList, setDisplayedMovieList] = useState([]);
    const [isViewingDetails, setIsViewingDetails] = useState(false);

    const handleViewMovieDetails = () => {
        scrollPosition.set(window.scrollY);
        setIsViewingDetails(true);
        lastLocation.set(pathname);
    };

    useEffect(() => {
        const previousPathname = lastLocation.get();
        if (!isViewingDetails && previousPathname === pathname) {
            const identifier = setTimeout(() => {
                window.scrollBy({top: scrollPosition.get(), left: 0, behavior: 'smooth'});
                scrollPosition.remove();
            }, delay.search*2);

            return () => {
                clearTimeout(identifier);
            };
        }
    }, [isViewingDetails]);

    useEffect(() => {
        const identifier = setTimeout(() => {

            // filter movies using Search...
            const filteredMovies = Object.values(movies).filter(movie => movie.title.toLowerCase().includes(search));
            setDisplayedMovieList(filteredMovies);
            if (filteredMovies.length < movies.length) {
                const message = isArrayExist(filteredMovies)
                    ? `Filter result: ${filteredMovies.length} movies`
                    : `Nothing found`;
                const type = isArrayExist(filteredMovies) ? 'info' : 'warning';
                dispatch(feedbackActions.setSnackbar({message, type}));
            }
        }, delay.search);

        return () => {
            clearTimeout(identifier);
        };
    }, [search, movies]);

    return (
        <div className={root}>
            {displayedMovieList.map(movie => {
                    const {id, tmdbId, posterPath, title, releaseDate} = movie;
                    return (
                        <Movie
                            key={id}
                            root={grid}
                            tmdbId={tmdbId}
                            poster={posterPath}
                            alt={`${fullTitle(title, releaseDate)}`}
                            onClick={handleViewMovieDetails}
                        />
                    )
                }
            )}
        </div>
    );
};

export default gallery;