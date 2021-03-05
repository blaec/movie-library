import React, {useEffect, useState} from 'react';
import axios from "../../axios-movies";

import {CircularProgress, Divider, Typography} from "@material-ui/core";

import BackdropImage from "./BackdropImage";
import './Details.css';
import {playTime, year} from '../../utils/Utils';
import {url_endpoints} from "../../utils/constants";

const details = (props) => {
    const [movieDetails, setMovieDetails] = useState();
    const [genres, setGenres] = useState('');
    const [backdrops, setBackdrops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("get data: " + (new Date()).getTime());
        setIsLoading(true);
        // credits
        // https://api.themoviedb.org/3/movie/9487/credits?api_key=d6c79c6e7c9d5f56185d9318481769bc&language=en-US
        axios.get(url_endpoints.movie + props.tmdbId + '?api_key=d6c79c6e7c9d5f56185d9318481769bc&language=ru&append_to_response=images&include_image_language=ru,null')
            .then(response => {
                console.log("extract data: " + (new Date()).getTime());
                let movies = response.data;
                console.log(movies);
                console.log(props);
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
                <BackdropImage {...props}
                               backdrops={backdrops}
                               alt={`${movieDetails.title} ${movieDetails.releaseDate}`}
                />
                <div className="Info">
                    <Typography variant="caption" display="block" gutterBottom color="textSecondary">
                        {props.location}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {year(movieDetails.release_date)} {'\u2B24'} {playTime(movieDetails.runtime)} {'\u2B24'} {props.resolution} {'\u2B24'} {props.size}Gb
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        <strong>{movieDetails.title}</strong>
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {genres}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1" gutterBottom>
                        <strong>{movieDetails.tagline}</strong>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {movieDetails.overview}
                    </Typography>
                </div>
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