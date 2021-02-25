import React, {useEffect, useState, useLayoutEffect } from 'react';
import Card from "../Card/Card";
import "./Gallery.css";
import axios from "../../axios-movies";
import Details from "../Details/Details";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const gallery = () => {
    const [movieList, setMovieList] = useState([]);
    const [selectedCard, setSelectedCard] = useState('');
    const [selected, setSelected] = useState(false);
    const [scrollY, setScrollY] = useState();
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

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

    useEffect(() => {
        axios.get('/movies')
            .then(response => {
                setMovieList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useLayoutEffect (() => {
        if (!selected) {
            window.scrollBy(0, scrollY);
        }
    }, [selected, scrollY]);

    let myGallery = selected
        ? (<Details closed={handlerClose}
                    delete={handleDelete}
                    {...selectedCard}/>)
        : (<div className="Gallery">
            {movieList.map(m =>
                <Card key={m.id}
                      {...m}
                      clicked={handlerSelectCard}/>
            )}
           </div>);

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