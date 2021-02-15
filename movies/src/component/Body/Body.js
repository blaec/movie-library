import React, {useState, useEffect} from 'react';
import Card from "../Card/Card";
import "./Body.css";
import axios from "../../axios-movies";

const body = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        axios.get('/movies')
            .then(response => {
                setMovieList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="Body">
            {movieList.map(m => <Card key={m.id} {...m}/>
            )}
        </div>
    );
};

export default body;