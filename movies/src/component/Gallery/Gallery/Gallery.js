import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios-movies";

import Movie from "./components/Movie/Movie";
import Details from "../Details/Details";
import MyLoader from "../../../UI/Spinners/MyLoader";
import MySnackbar from "../../../UI/MySnackbar";
import * as actions from "../../../store/actions";
import "./Gallery.css";

import Pagination from '@material-ui/lab/Pagination';
import {getDeleteUrl} from "../../../utils/UrlUtils";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

// Duplicate to @media in Movie.css
const resolutions = {
    450: {rows: 12, moviesPerRow: 2},
    700: {rows: 7, moviesPerRow: 3},
    1000: {rows: 6, moviesPerRow: 4},
    1300: {rows: 5, moviesPerRow: 5},
    1700: {rows: 4, moviesPerRow: 6},
    9999: {rows: 3, moviesPerRow: 7}
};

const gallery = (props) => {
    let {movies} = props;

    const search = useSelector(state => state.search);
    const dispatch = useDispatch();
    const onDeleteMovieChange = (movies) => dispatch(actions.deleteMovies(movies));

    const [displayedMovieList, setDisplayedMovieList] = useState([]);
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [isViewingDetails, setIsViewingDetails] = useState(false);
    const [scrollPosition, setScrollPosition] = useState();
    const [isLoading, setIsLoading] = useState(false);

    let initialSnackBarState = {open: false, message: '', type: ''};
    const [snackbarProps, setSnackbarProps] = useState(initialSnackBarState);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps(initialSnackBarState);
    };

    const handleViewMovieDetails = (movie) => {
        setScrollPosition(window.scrollY);
        setSelectedMovie(movie);
        setIsViewingDetails(true);
    };

    const handleDetailsClose = () => {
        setIsViewingDetails(false);
    };

    const handleDeleteMovie = (id) => {
        setIsLoading(true);
        axios.delete(getDeleteUrl(id))
            .then(response => {
                let deleted = movies.find(m => m.id === id);
                let updatedMovieList = movies.filter(m => m.id !== id);
                onDeleteMovieChange(updatedMovieList);
                handleDetailsClose();
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Movie '${deleted.title}' is deleted`, type: 'success'});
            })
            .catch(error => {
                handleDetailsClose();
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Failed to deleted movie with id '${id}'`, type: 'error'});
            });
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (!isViewingDetails) {
            window.scrollBy(0, scrollPosition);
        }
    }, [isViewingDetails, scrollPosition]);

    const windowWidth = window.innerWidth;
    useEffect(() => {

        // filter movies using Search...
        const filteredMovies = Object.values(movies).filter(m => m.title.toLowerCase().includes(search));
        setDisplayedMovieList(filteredMovies);

        // set gallery pagination structure
        const structure = resolutions[Object.keys(resolutions).filter(res => windowWidth <= res)[0]];
        let moviesPerPage = structure.rows * structure.moviesPerRow;
        setMoviesPerPage(moviesPerPage);
        setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
    }, [search, windowWidth, movies]);

    let myGallery = <MyLoader/>;
    if (!isLoading) {
        if (isViewingDetails) {
            myGallery = <Details closed={handleDetailsClose}
                                 delete={handleDeleteMovie}
                                 {...selectedMovie}/>;
        } else {
            const lastMovieOnCurrentPage = currentPage * moviesPerPage;
            const moviesOnCurrentPage = displayedMovieList.slice(lastMovieOnCurrentPage - moviesPerPage, lastMovieOnCurrentPage);
            myGallery = (
                <React.Fragment>
                    <div className="Gallery">
                        {moviesOnCurrentPage.map(movie =>
                            <Movie key={movie.id}
                                   {...movie}
                                   clicked={handleViewMovieDetails}/>
                        )}
                    </div>
                    <Pagination className="Pagination"
                                page={currentPage}
                                count={totalPages}
                                onChange={handlePageChange}
                                variant="outlined"
                                color="primary"/>
                </React.Fragment>
            );
        }
    }
    let snackbar = null;
    if (snackbarProps.open) {
        snackbar = <MySnackbar {...snackbarProps}
                               close={handleSnackbarClose}/>;
    }

    return (
        <React.Fragment>
            {myGallery}
            {snackbar}
        </React.Fragment>
    );
};

export default gallery;