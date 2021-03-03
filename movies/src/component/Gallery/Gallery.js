import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "../../axios-movies";

import Movie from "../Movie/Movie";
import Details from "../Details/Details";
import DeleteDialog from "./DeleteDialog";
import "./Gallery.css";
import Pagination from '@material-ui/lab/Pagination';

const gallery = () => {
    const [movieList, setMovieList] = useState([]);
    const [displayMovieList, setDisplayMovieList] = useState([]);
    const [selectedCard, setSelectedCard] = useState('');
    const [selected, setSelected] = useState(false);
    const [scrollY, setScrollY] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [movieCount, setMovieCount] = useState(0);

    const search = useSelector(state => state.search);

    const innerWidth = window.innerWidth;
    useEffect(() => {
        let structure = {rows: 3, moviesPerRow: 7};
        switch (true) {
            case (innerWidth < 450):    structure = {rows: 12, moviesPerRow: 2};   break;
            case (innerWidth <= 700):   structure = {rows: 7, moviesPerRow: 3};    break;
            case (innerWidth <= 1000):  structure = {rows: 6, moviesPerRow: 4};    break;
            case (innerWidth <= 1300):  structure = {rows: 5, moviesPerRow: 5};    break;
            case (innerWidth <= 1700):  structure = {rows: 4, moviesPerRow: 6};    break;
        }
        setMoviesPerPage(structure.rows * structure.moviesPerRow);
        setMovieCount(Math.ceil(displayMovieList.length / moviesPerPage));

        }, [displayMovieList]
    );

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
        console.log("get: " + moviesPerPage);
        axios.get('/movies')
            .then(response => {
                setMovieList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setDisplayMovieList(Object.values(movieList).filter(m => m.title.toLowerCase().includes(search)));
    }, [search, movieList]);

    useLayoutEffect (() => {
        if (!selected) {
            window.scrollBy(0, scrollY);
        }
    }, [selected, scrollY]);

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