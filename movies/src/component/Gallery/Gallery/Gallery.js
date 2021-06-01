import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import Movie from "./components/Movie";
import {fullTitle} from "../../../utils/Utils";
import {delay, grid} from "../../../utils/Constants";

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
}));

const gallery = (props) => {
    let {movies} = props;
    const {root, pagination} = useStyles();

    const search = useSelector(state => state.filter.search);

    const [displayedMovieList, setDisplayedMovieList] = useState([]);
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewingDetails, setIsViewingDetails] = useState(false);
    const [scrollPosition, setScrollPosition] = useState();

    const handleViewMovieDetails = () => {
        setScrollPosition(window.scrollY);
        setIsViewingDetails(true);
        localStorage.setItem('currentPage', `${currentPage}`);
    };

    const handlePageChange = (event, page) => {
        localStorage.removeItem('currentPage');
        setCurrentPage(page);
    };

    useEffect(() => {
        if (!isViewingDetails) {
            window.scrollBy(0, scrollPosition);
        }
    }, [isViewingDetails, scrollPosition]);

    useEffect(() => {
        let page = +localStorage.getItem('currentPage');
        if (page !== 0) {
            setCurrentPage(page);
            localStorage.removeItem('currentPage')
        }
    }, []);

    const windowWidth = window.innerWidth;
    useEffect(() => {
        const identifier = setTimeout(() => {

            // filter movies using Search...
            const filteredMovies = Object.values(movies).filter(movie => movie.title.toLowerCase().includes(search));
            setDisplayedMovieList(filteredMovies);

            // set gallery pagination structure
            const structure = Object.values(grid).filter(grid => grid.resolution < windowWidth).slice(-1).pop();
            let moviesPerPage = structure.rows * structure.moviesPerRow;
            setMoviesPerPage(moviesPerPage);
            setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
        }, delay.search);

        return () => {
            clearTimeout(identifier);
        };
    }, [search, windowWidth, movies]);

    const lastMovieOnCurrentPage = currentPage * moviesPerPage;
    const moviesOnCurrentPage = displayedMovieList.slice(lastMovieOnCurrentPage - moviesPerPage, lastMovieOnCurrentPage);
    let myGallery = (
        <React.Fragment>
            <div className={root}>
                {moviesOnCurrentPage.map(movie => {
                        const {id, tmdbId, posterPath, title, releaseDate} = movie;
                        return (
                            <Movie
                                key={id}
                                tmdbId={tmdbId}
                                poster={posterPath}
                                alt={`${fullTitle(title, releaseDate)}`}
                                onClick={handleViewMovieDetails}
                            />
                        )
                    }
                )}
            </div>
            <Pagination
                className={pagination}
                page={currentPage}
                count={totalPages}
                variant="outlined"
                color="primary"
                onChange={handlePageChange}/>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {myGallery}
        </React.Fragment>
    );
};

export default gallery;