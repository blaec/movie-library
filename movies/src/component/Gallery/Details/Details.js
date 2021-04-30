import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {useSelector} from "react-redux";

import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import MyLoader from "../../../UI/Spinners/MyLoader";
import {getMovieCreditsUrl, getMovieDetailsUrl, getOmdbMovieDetails} from "../../../utils/UrlUtils";
import {fullTitle, joinNames} from "../../../utils/Utils";

import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    root: {
        [`@media (orientation:landscape)`]: {
            margin: '0 10%',
        },
        [`${theme.breakpoints.up(1000)} and (orientation:landscape)`]: {
            margin: '0 25%',
        },
    },
}));

// TODO refactor multiple axios get requests
const details = (props) => {
    const {tmdbId, id, onClose, onDelete, onActorSelect, movieToInfoComponent} = props;
    const {root} = useStyle();
    const {tmdbApi, omdbApi} = useSelector(state => state.api);

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
        axios.get(getMovieDetailsUrl(tmdbId, tmdbApi))
            .then(response => {
                const {data} = response;
                const {imdb_id, genres, images} = data;
                const {backdrops} = images;

                // console.log("extract data: " + (new Date()).getTime());
                setMovieDetails(data);
                setGenres(joinNames(genres));
                setBackdrops(backdrops);

                // Get movie additional details from omdb
                axios.get(getOmdbMovieDetails(imdb_id, omdbApi))
                    .then(response => {
                        const {data} = response;
                        setOmdbMovieDetails(data);
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
        axios.get(getMovieCreditsUrl(tmdbId, tmdbApi))
            .then(response => {
                const {data} = response;
                const {cast} = data;
                // console.log("extract cast: " + (new Date()).getTime());
                setCast(cast);
                setIsLoadingCast(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoadingCast(false);
            });
    }, []);

    let details = <MyLoader/>
    if (!isLoadingMovies && !isLoadingCast) {
        const {title, releaseDate} = movieDetails;
        details = (
            <React.Fragment>
                <BackdropImage id={id}
                               backdrops={backdrops}
                               alt={`${fullTitle(title, releaseDate)}`}
                               onClose={onClose}
                               onDelete={onDelete}
                />
                <Info tmdbDetails={movieDetails}
                      omdbDetails={omdbMovieDetails}
                      fileDetails={movieToInfoComponent}
                      castDetails={cast}
                      genreDetails={genres}
                      onActorSelect={onActorSelect}
                />
            </React.Fragment>
        );
    }

    return (
        <div className={root}>
            {details}
        </div>
    );
};

export default details;