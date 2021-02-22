import React, {useEffect, useState, useLayoutEffect } from 'react';
import Card from "../Card/Card";
import "./Gallery.css";
import axios from "../../axios-movies";
import Details from "../Details/Details";

const gallery = () => {
    const [movieList, setMovieList] = useState([]);
    const [selectedCard, setSelectedCard] = useState('');
    const [selected, setSelected] = useState(false);
    const [scrollY, setScrollY] = useState();

    const handlerSelectCard = (movie) => {
        setScrollY(window.scrollY);
        setSelectedCard(movie);
        setSelected(true);
    }

    const handlerClose = () => {
        setSelected(false);
    }

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
        </React.Fragment>
    );
};

export default gallery;