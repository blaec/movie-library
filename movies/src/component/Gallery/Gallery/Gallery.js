import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";

import Movie from "./components/Movie";
import {drawerWidth, fullTitle, isArrayExist, isStringsExist} from "../../../utils/Utils";
import {delay, grid} from "../../../utils/Constants";
import {lastLocation, selectedPage} from "../../../store/localStorage/actions";
import {feedbackActions} from "../../../store/state/feedback/feedback-slice";

import Pagination from '@material-ui/lab/Pagination';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0',
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
    const {root, pagination, grid} = useStyles(window.innerWidth);
    const {pathname} = useLocation();

    const search = useSelector(state => state.filter.search);
    const dispatch = useDispatch();

    const [displayedMovieList, setDisplayedMovieList] = useState([]);
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewingDetails, setIsViewingDetails] = useState(false);
    const [scrollPosition, setScrollPosition] = useState();

    const handleViewMovieDetails = () => {
        setScrollPosition(window.scrollY);
        setIsViewingDetails(true);
        selectedPage.set(`${currentPage}`);
        lastLocation.set(pathname);
    };

    const handlePageChange = (event, page) => {
        selectedPage.remove();
        setCurrentPage(page);
    };

    useEffect(() => {
        if (!isViewingDetails) {
            window.scrollBy(0, scrollPosition);
        }
    }, [isViewingDetails, scrollPosition]);

    useEffect(() => {
        const page = selectedPage.get();
        const previousPathname = lastLocation.get();
        if (page !== 0 && previousPathname === pathname) {
            setCurrentPage(page);
            selectedPage.remove();
            lastLocation.remove();
        }
    }, []);

    const windowWidth = window.innerWidth;
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

            // set gallery pagination structure
            const structure = Object.values(grid).filter(grid => grid.resolution < windowWidth).slice(-1).pop();
            // let moviesPerPage = structure.rows * structure.moviesPerRow;
            // setMoviesPerPage(moviesPerPage);
            // setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));

            // reset current page when search is used
            if (isStringsExist(search)) {
                setCurrentPage(1);
            }
        }, delay.search);

        return () => {
            clearTimeout(identifier);
        };
    }, [search, windowWidth, movies]);

    const lastMovieOnCurrentPage = currentPage * moviesPerPage;
    // const moviesOnCurrentPage = displayedMovieList.slice(lastMovieOnCurrentPage - moviesPerPage, lastMovieOnCurrentPage);
    let myGallery = (
        <React.Fragment>
            <div className={root}>
                {displayedMovieList.map(movie => {
                        const {id, tmdbId, posterPath, title, releaseDate} = movie;
                        return (
                            <Movie
                                key={id}
                                tmdbId={tmdbId}
                                root={grid}
                                poster={posterPath}
                                alt={`${fullTitle(title, releaseDate)}`}
                                onClick={handleViewMovieDetails}
                            />
                        )
                    }
                )}
            </div>
            {/*{*/}
            {/*    isArrayExist(displayedMovieList) &&*/}
            {/*    <Pagination*/}
            {/*        className={pagination}*/}
            {/*        page={currentPage}*/}
            {/*        count={totalPages}*/}
            {/*        variant="outlined"*/}
            {/*        color="primary"*/}
            {/*        onChange={handlePageChange}/>*/}
            {/*}*/}
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {myGallery}
        </React.Fragment>
    );
};

export default gallery;