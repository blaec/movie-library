import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios-movies";

import Movie from "./components/Movie/Movie";
import Details from "../Details/Details";
import ActorDetails from "../ActorDetails/ActorDetails";
import MyLoader from "../../../UI/Spinners/MyLoader";
import MySnackbar, {initialSnackBarState} from "../../../UI/MySnackbar";
import {getDeleteUrl} from "../../../utils/UrlUtils";
import * as actions from "../../../store/actions";

import Pagination from '@material-ui/lab/Pagination';
import {fullTitle} from "../../../utils/Utils";
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
    }
}));

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
    let {movies, isCollection} = props;
    const {root, pagination} = useStyles();

    const search = useSelector(state => state.search);
    const dispatch = useDispatch();
    const onDeleteMovieChange = (movies) => dispatch(actions.deleteMovies(movies));

    const [displayedMovieList, setDisplayedMovieList] = useState([]);
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [isViewingDetails, setIsViewingDetails] = useState(false);
    const [isViewingActorDetails, setIsViewingActorDetails] = useState(false);
    const [scrollPosition, setScrollPosition] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarProps, setSnackbarProps] = useState(initialSnackBarState);
    const [actorId, setActorId] = useState();

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
                let deleted = movies.find(movie => movie.id === id);
                let updatedMovieList = movies.filter(movie => movie.id !== id);
                if (isCollection) {
                    onDeleteMovieChange(updatedMovieList);
                }
                handleDetailsClose();
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Movie '${deleted.title}' is deleted`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                handleDetailsClose();
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Failed to deleted movie with id '${id}'`, type: 'error'});
            });
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleActorSelect = (id, name) => {
        setActorId(id);
        setIsViewingActorDetails(true);
    };

    const handleCloseActorMovies = () => {
        setActorId(null);
        setIsViewingActorDetails(false);
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
        const structure = resolutions[Object.keys(resolutions).filter(res => windowWidth <= res)[0]];
        let moviesPerPage = structure.rows * structure.moviesPerRow;
        setMoviesPerPage(moviesPerPage);
        setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
    }, [search, windowWidth, movies]);

    let myGallery = <MyLoader/>;
    if (!isLoading) {
        if (isViewingDetails) {
            if (isViewingActorDetails) {
                myGallery = <ActorDetails id={actorId} onClose={handleCloseActorMovies}/>
            } else {
                myGallery = <Details {...selectedMovie.movieToDetailsComponent}
                                     movieToInfoComponent={selectedMovie.movieToInfoComponent}
                                     onClose={handleDetailsClose}
                                     onDelete={handleDeleteMovie}
                                     onActorSelect={handleActorSelect}
                />;
            }
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
    let snackbar = null;
    if (snackbarProps.open) {
        snackbar = <MySnackbar {...snackbarProps}
                               onClose={handleSnackbarClose}/>;
    }

    return (
        <React.Fragment>
            {myGallery}
            {snackbar}
        </React.Fragment>
    );
};

export default gallery;