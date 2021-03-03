import React, {useEffect, useState, useLayoutEffect } from 'react';
import {useSelector} from "react-redux";
import Movie from "../Movie/Movie";
import "./Gallery.css";
import axios from "../../axios-movies";
import Details from "../Details/Details";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

const gallery = () => {
    const [movieList, setMovieList] = useState([]);
    const [displayMovieList, setDisplayMovieList] = useState([]);
    const [selectedCard, setSelectedCard] = useState('');
    const [selected, setSelected] = useState(false);
    const [scrollY, setScrollY] = useState();
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(0);
    const [movieCount, setMovieCount] = useState(0);

    const search = useSelector(state => state.search);

    let innerWidth = window.innerWidth;
    useEffect(() => {
        console.log("width: " + moviesPerPage);
        let rows = 3;
        let moviesPerRow = 7;
        switch (true) {
            case (innerWidth < 400):    rows = 12;  moviesPerRow = 2;   break;
            case (innerWidth <= 700):   rows = 7;   moviesPerRow = 3;   break;
            case (innerWidth <= 1000):  rows = 6;   moviesPerRow = 4;   break;
            case (innerWidth <= 1300):  rows = 5;   moviesPerRow = 5;   break;
            case (innerWidth <= 1700):  rows = 4;   moviesPerRow = 6;   break;
        }
        setMoviesPerPage(rows * moviesPerRow);
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
        setDeletePrompt(true);
    };

    const handleClose = () => {
        setDeleteId(0);
        setDeletePrompt(false);
    };

    const handleDeleteMovie = () => {
        axios.delete('/movies/' + deleteId)
            .then(response => {
                let updatedMovieList = movieList.filter(m => m.id !== deleteId);
                setMovieList(updatedMovieList);
                handleClose();
                handlerClose();
                setDeleteId(0);
            })
            .catch(error => {
                handleClose();
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
            <Dialog
                open={deletePrompt}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete movie"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete this movie?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        No
                    </Button>
                    <Button onClick={handleDeleteMovie} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default gallery;