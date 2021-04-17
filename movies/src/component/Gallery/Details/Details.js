import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {useSelector} from "react-redux";

import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import MyLoader from "../../../UI/Spinners/MyLoader";
import './Details.css';
import {getMovieCreditsUrl, getMovieDetailsUrl, getOmdbMovieDetails} from "../../../utils/UrlUtils";
import {joinNames} from "../../../utils/Utils";

// TODO refactor multiple axios get requests
const details = (props) => {
    const {tmdbId, id, onClose, onDelete} = props;
    const configs = useSelector(state => state.api);

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
        axios.get(getMovieDetailsUrl(tmdbId, configs.tmdbApi))
            .then(response => {

                // console.log("extract data: " + (new Date()).getTime());
                let details = response.data;
                setMovieDetails(details);
                setGenres(joinNames(details.genres));
                setBackdrops(details.images.backdrops);

                // Get movie additional details from omdb
                axios.get(getOmdbMovieDetails(details.imdb_id, configs.omdbApi))
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
        axios.get(getMovieCreditsUrl(tmdbId, configs.tmdbApi))
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
                <BackdropImage closed={onClose}
                               delete={onDelete}
                               movieId={id}
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