import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "../../axios-movies";

import Movie from "../Movie/Movie";
import Details from "../Details/Details";
import DeleteDialog from "./DeleteDialog";
import "./Gallery.css";
import Pagination from '@material-ui/lab/Pagination';
import {CircularProgress} from "@material-ui/core";

// Duplicate to @media in Movie.css
const resolutions = {
    450: {rows: 12, moviesPerRow: 2},
    700: {rows: 7, moviesPerRow: 3},
    1000: {rows: 6, moviesPerRow: 4},
    1300: {rows: 5, moviesPerRow: 5},
    1700: {rows: 4, moviesPerRow: 6}
};

const gallery = () => {
    const [loadedMovieList, setLoadedMovieList] = useState([]);
    const [displayedMovieList, setDisplayedMovieList] = useState([]);
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selected, setSelected] = useState(false);
    const [scrollY, setScrollY] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [loading, setLoading] = useState(false);

    const search = useSelector(state => state.search);

    const handlerSelectCard = (movie) => {
        setScrollY(window.scrollY);
        setSelectedMovie(movie);
        setSelected(true);
    };

    const handleDetailsClose = () => {
        setSelected(false);
    };

    const handleDeletedMovie = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteId(0);
        setIsDeleting(false);
    };

    const handleDeleteMovie = () => {
        setLoading(true);
        axios.delete('/movies/' + deleteId)
            .then(response => {
                let updatedMovieList = loadedMovieList.filter(m => m.id !== deleteId);
                setLoadedMovieList(updatedMovieList);
                handleCloseDeleteDialog();
                handleDetailsClose();
                setDeleteId(0);
                setLoading(false);
            })
            .catch(error => {
                handleCloseDeleteDialog();
                handleDetailsClose();
                setDeleteId(0);
                console.log(error);
                setLoading(false);
            });
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setLoading(true);
        axios.get('/movies')
            .then(response => {
                setLoadedMovieList(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!selected) {
            window.scrollBy(0, scrollY);
        }
    }, [selected, scrollY]);

    const windowWidth = window.innerWidth;
    useEffect(() => {

        // filter movies using Search...
        const filteredMovies = Object.values(loadedMovieList).filter(m => m.title.toLowerCase().includes(search));
        setDisplayedMovieList(filteredMovies);

        // set gallery pagination structure
        const structure = resolutions[Object.keys(resolutions).filter(res => windowWidth <= res)[0]];
        setMoviesPerPage(structure.rows * structure.moviesPerRow);
        setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
    }, [search, windowWidth, loadedMovieList]);

    let myGallery = <CircularProgress/>;
    if (!loading) {
        if (selected) {
            myGallery = <Details closed={handleDetailsClose}
                                 delete={handleDeletedMovie}
                                 {...selectedMovie}/>;
        } else {
            const lastMovieOnCurrentPage = currentPage * moviesPerPage;
            const moviesOnCurrentPage = displayedMovieList.slice(lastMovieOnCurrentPage - moviesPerPage, lastMovieOnCurrentPage);
            myGallery = (
                <React.Fragment>
                    <div className="Gallery">
                        {moviesOnCurrentPage.map(m =>
                            <Movie key={m.id}
                                   {...m}
                                   clicked={handlerSelectCard}/>
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

    return (
        <React.Fragment>
            {myGallery}
            <DeleteDialog open={isDeleting}
                          exit={handleCloseDeleteDialog}
                          delete={handleDeleteMovie}
            />
        </React.Fragment>
    );
};

export default gallery;