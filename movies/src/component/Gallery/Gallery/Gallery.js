import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios-movies";

import Movie from "./components/Movie";
import Details from "../Details/Details";
import MyLoader from "../../../UI/Spinners/MyLoader";
import {getDeleteUrl} from "../../../utils/UrlUtils";
import * as actions from "../../../store/actions";
import {fullTitle} from "../../../utils/Utils";
import {grid} from "../../../utils/Constants";

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
    detailsRoot: {
        [`@media (orientation:landscape)`]: {
            margin: '0 10%',
        },
        [`${theme.breakpoints.up(1000)} and (orientation:landscape)`]: {
            margin: '0 25%',
        },
        backgroundColor: '#3f51b50f',
    },
}));

const gallery = (props) => {
    let {movies, isCollection} = props;
    const {root, detailsRoot, pagination} = useStyles();

    const search = useSelector(state => state.search);
    const dispatch = useDispatch();
    const onDeleteMovieChange = (movies) => dispatch(actions.deleteMovies(movies));
    const onDeleteWishlistChange = (movies) => dispatch(actions.deleteWishlist(movies));
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));
    const onSetSelectedMovieDetails = (movie) => dispatch(actions.setSelectedMovieDetails(movie));

    const [displayedMovieList, setDisplayedMovieList] = useState([]);
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [isViewingDetails, setIsViewingDetails] = useState(false);
    const [scrollPosition, setScrollPosition] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleViewMovieDetails = (movie) => {
        setScrollPosition(window.scrollY);
        onSetSelectedMovieDetails(movie);
        console.log(movie);
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
                let deleted = movies.find(movie => movie.id === id);
                let updatedMovieList = movies.filter(movie => movie.id !== id);
                if (isCollection) {
                    onDeleteMovieChange(updatedMovieList);
                } else {
                    onDeleteWishlistChange(updatedMovieList);
                }
                handleDetailsClose();
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Movie '${deleted.title}' is deleted`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                handleDetailsClose();
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Failed to deleted movie with id '${id}'`, type: 'error'});
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
        const filteredMovies = Object.values(movies).filter(movie => movie.title.toLowerCase().includes(search));
        setDisplayedMovieList(filteredMovies);

        // set gallery pagination structure
        const structure = Object.values(grid).filter(grid => grid.resolution < windowWidth).slice(-1).pop();
        let moviesPerPage = structure.rows * structure.moviesPerRow;
        setMoviesPerPage(moviesPerPage);
        setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
    }, [search, windowWidth, movies]);

    let myGallery = <MyLoader/>;
    if (!isLoading) {
        if (isViewingDetails) {
            myGallery = <div className={detailsRoot}>
                             <Details {...selectedMovie.movieToDetailsComponent}
                                      movieToInfoComponent={selectedMovie.movieToInfoComponent}
                                      onClose={handleDetailsClose}
                                      onDelete={handleDeleteMovie}
                             />
                        </div>;
        } else {
            const lastMovieOnCurrentPage = currentPage * moviesPerPage;
            const moviesOnCurrentPage = displayedMovieList.slice(lastMovieOnCurrentPage - moviesPerPage, lastMovieOnCurrentPage);
            myGallery = (
                <React.Fragment>
                    <div className={root}>
                        {moviesOnCurrentPage.map(movie => {
                                const {id, tmdbId, posterPath, title, releaseDate, resolution, size, location} = movie;
                                return (
                                    <Movie key={id}
                                           poster={posterPath}
                                           alt={`${fullTitle(title, releaseDate)}`}
                                           onClick={handleViewMovieDetails}
                                           movieToComponents={{
                                               movieToDetailsComponent: {
                                                   id: id,
                                                   tmdbId: tmdbId
                                               },
                                               movieToInfoComponent: {
                                                   resolution: resolution,
                                                   size: size,
                                                   location: location
                                               }
                                           }}
                                    />
                                )
                            }
                        )}
                    </div>
                    <Pagination className={pagination}
                                page={currentPage}
                                count={totalPages}
                                variant="outlined"
                                color="primary"
                                onChange={handlePageChange}/>
                </React.Fragment>
            );
        }
    }

    return (
        <React.Fragment>
            {myGallery}
        </React.Fragment>
    );
};

export default gallery;