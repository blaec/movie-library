import React, {useEffect, useState} from 'react';
import './Details.css';
import {Button, CardActions, CircularProgress} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import axios from "../../axios-movies";

const details = (props) => {
    const [movieData, setMovieData] = useState();
    const [genres, setGenres] = useState('');

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/' + props.tmdbId + '?api_key=d6c79c6e7c9d5f56185d9318481769bc')
            .then(response => {
                console.log(response.data);
                setMovieData(response.data);
                setGenres(response.data.genres.map(g => g.name).join(', '));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    let details = <CircularProgress/>
    if (movieData) {
        details = (
            <React.Fragment>
                <img src={"http://image.tmdb.org/t/p/original" + movieData.backdrop_path}
                     loading="lazy"
                     alt={`${props.title} ${props.releaseDate}`}
                />
                <h3>{props.title}</h3>
                <h5>{genres}</h5>
                <Button variant="outlined"
                        color="primary"
                        startIcon={<AddCircleTwoToneIcon/>}
                        onClick={props.closed}
                >
                    Close
                </Button>
            </React.Fragment>
        );
    }

    return (
        <div className="Details">
            {details}
        </div>
    );
};

export default details;