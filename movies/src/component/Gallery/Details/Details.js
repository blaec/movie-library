import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";

import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import MyLoader from "../../../UI/Spinners/MyLoader";
import './Details.css';
import {getMovieCreditsUrl, getMovieDetailsUrl, getOmdbMovieDetails} from "../../../utils/UrlUtils";

// TODO refactor multiple axios get requests
const details = (props) => {
    const [movieDetails, setMovieDetails] = useState();
    const [omdbMovieDetails, setOmdbMovieDetails] = useState();
    const [cast, setCast] = useState();
    const [genres, setGenres] = useState('');
    const [backdrops, setBackdrops] = useState([]);
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);
    const [isLoadingCast, setIsLoadingCast] = useState(true);

    useEffect(() => {
        // console.log("get data: " + (new Date()).getTime());
        setIsLoadingMovies(true);
        axios.get(getMovieDetailsUrl(props.tmdbId))
            .then(response => {

                // console.log("extract data: " + (new Date()).getTime());
                let details = response.data;
                setMovieDetails(details);
                setGenres(details.genres.map(genre => genre.name).join(', '));
                setBackdrops(details.images.backdrops);

                // Get movie additional details from omdb
                axios.get(getOmdbMovieDetails(details.imdb_id))
                    .then(response => {
                        setOmdbMovieDetails(response.data);
                        setIsLoadingMovies(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsLoadingMovies(false);
                    });

            })
            .catch(error => {
                console.log(error);
                setIsLoadingMovies(false);
            });
    }, []);

    useEffect(() => {
        // console.log("get cast: " + (new Date()).getTime());
        setIsLoadingCast(true);
        axios.get(getMovieCreditsUrl(props.tmdbId))
            .then(response => {
                // console.log("extract cast: " + (new Date()).getTime());
                setCast(response.data.cast);
                setIsLoadingCast(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoadingCast(false);
            });
    }, []);

    let details = <MyLoader/>
    if (!isLoadingMovies && !isLoadingCast) {
        details = (
            <React.Fragment>
                <BackdropImage closed={props.closed}
                               delete={props.delete}
                               movieId={props.id}
                               backdrops={backdrops}
                               alt={`${movieDetails.title} ${movieDetails.releaseDate}`}
                />
                <Info details={movieDetails}
                      omdbDetails={omdbMovieDetails}
                      file={props}
                      cast={cast}
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