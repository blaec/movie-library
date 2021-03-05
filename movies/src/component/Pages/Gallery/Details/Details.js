import React, {useEffect, useState} from 'react';
import axios from "../../../../axios-movies";

import {CircularProgress} from "@material-ui/core";

import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import './Details.css';
import {getMovieDetailsUrl} from "../../../../utils/UrlUtils";

const details = (props) => {
    const [movieDetails, setMovieDetails] = useState();
    const [genres, setGenres] = useState('');
    const [backdrops, setBackdrops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("get data: " + (new Date()).getTime());
        setIsLoading(true);
        axios.get(getMovieDetailsUrl(props.tmdbId))
            .then(response => {
                console.log("extract data: " + (new Date()).getTime());
                let movies = response.data;
                setMovieDetails(movies);
                setGenres(movies.genres.map(genre => genre.name).join(', '));
                setBackdrops(movies.images.backdrops);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let details = <CircularProgress/>
    if (!isLoading) {
        details = (
            <React.Fragment>
                <BackdropImage closed={props.closed}
                               delete={props.delete}
                               movieId={props.id}
                               backdrops={backdrops}
                               alt={`${movieDetails.title} ${movieDetails.releaseDate}`}
                />
                <Info details={movieDetails}
                      file={props}
                      genres={genres}
                />
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