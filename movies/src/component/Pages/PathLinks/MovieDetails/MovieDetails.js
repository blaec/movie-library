import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

import {getMovieCreditsUrl, getMovieDetailsUrl, getOmdbMovieDetails} from "../../../../utils/UrlUtils";
import {fullTitle, joinNames} from "../../../../utils/Utils";
import BackdropImage from "../../../Gallery/Details/components/BackdropImage";
import Info from "../../../Gallery/Details/components/Info";
import MyLoader from "../../../../UI/Spinners/MyLoader";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        [`@media (orientation:landscape)`]: {
            margin: '0 10%',
        },
        [`${theme.breakpoints.up(1000)} and (orientation:landscape)`]: {
            margin: '0 25%',
        },
        backgroundColor: '#3f51b50f',
    },
}));

// TODO refactor multiple axios get requests
const movieDetails = (props) => {
    const {match : {params : {movieId}}} = props;
    // const {tmdbId, id, onClose, onDelete, movieToInfoComponent} = props;
    const {root} = useStyles();
    const {tmdbApi, omdbApi} = useSelector(state => state.api);
    const movies = useSelector(state => state.movies);

    console.log(movies);

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
        axios.get(getMovieDetailsUrl(movieId, tmdbApi))
            .then(response => {
                const {data} = response;
                const {imdb_id, genres, images} = data;
                const {backdrops} = images;

                // console.log("extract data: " + (new Date()).getTime());
                setMovieDetails(data);
                console.log(data);
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
        axios.get(getMovieCreditsUrl(movieId, tmdbApi))
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
            <div className={root}>
                <BackdropImage backdrops={backdrops}
                               alt={`${fullTitle(title, releaseDate)}`}
                               // id={id}
                               // onClose={onClose}
                               // onDelete={onDelete}
                />
                <Info tmdbDetails={movieDetails}
                      omdbDetails={omdbMovieDetails}
                      fileDetails={{resolution: 1, size: 1, location: 1}}
                      castDetails={cast}
                      genreDetails={genres}
                />
            </div>
        );
    }

    return (
        <React.Fragment>
             {details}
        </React.Fragment>
    );
};

export default movieDetails;