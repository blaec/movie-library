import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "../../axios-movies";

import Movie from "../Movie/Movie";
import Details from "../Details/Details";
import DeleteDialog from "./DeleteDialog";
import "./Gallery.css";
import Pagination from '@material-ui/lab/Pagination';

// Duplicate to @media in Movie.css
const resolutions = {
    450: {rows: 12, moviesPerRow: 2},
    700: {rows: 7, moviesPerRow: 3},
    1000: {rows: 6, moviesPerRow: 4},
    1300: {rows: 5, moviesPerRow: 5},
    1700: {rows: 4, moviesPerRow: 6}
};

const gallery = () => {
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [movieCount, setMovieCount] = useState(0);
    const [movieList, setMovieList] = useState([]);
    const [displayMovieList, setDisplayMovieList] = useState([]);
    const [selectedCard, setSelectedCard] = useState('');
    const [selected, setSelected] = useState(false);
    const [scrollY, setScrollY] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const search = useSelector(state => state.search);

    const handlerSelectCard = (movie) => {
        setScrollY(window.scrollY);
        setSelectedCard(movie);
        setSelected(true);
    };

    const handlerClose = () => {
        setSelected(false);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteId(0);
        setIsDeleting(false);
    };

    const handleDeleteMovie = () => {
        axios.delete('/movies/' + deleteId)
            .then(response => {
                let updatedMovieList = movieList.filter(m => m.id !== deleteId);
                setMovieList(updatedMovieList);
                handleCloseDeleteDialog();
                handlerClose();
                setDeleteId(0);
            })
            .catch(error => {
                handleCloseDeleteDialog();
                handlerClose();
                setDeleteId(0);
                console.log(error);
            });
    };

    const handlePagination = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        axios.get('/movies')
            .then(response => {
                console.log("set movies: " + (new Date()).getTime());
                setMovieList(response.data);
                setDisplayMovieList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect (() => {
        if (!selected) {
            window.scrollBy(0, scrollY);
        }
    }, [selected, scrollY]);

    const windowWidth = window.innerWidth;
    useEffect(() => {

        // filter movies using Search...
        const filteredMovies = Object.values(movieList).filter(m => m.title.toLowerCase().includes(search));
        setDisplayMovieList(filteredMovies);

        // set gallery pagination structure
        const structure = resolutions[Object.keys(resolutions).filter(res => windowWidth <= res)[0]];
        setMoviesPerPage(structure.rows * structure.moviesPerRow);
        setMovieCount(Math.ceil(filteredMovies.length / moviesPerPage));
    }, [search, windowWidth]);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = displayMovieList.slice(indexOfFirstMovie, indexOfLastMovie);

    let myGallery = selected
        ? (<Details closed={handlerClose}
                    delete={handleDelete}
                    {...selectedCard}/>)
        : ( <React.Fragment>
                <div className="Gallery">
                    {currentMovies.map(m =>
                        <Movie key={m.id}
                              {...m}
                              clicked={handlerSelectCard}/>
                    )}
                </div>
                <Pagination className="Pagination"
                            page={currentPage}
                            count={movieCount}
                            onChange={handlePagination}
                            variant="outlined"
                            color="primary"/>
            </React.Fragment>);

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