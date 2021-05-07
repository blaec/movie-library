import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../../axios-movies";

import {getDeleteUrl, getMovieCreditsUrl, getMovieDetailsUrl, getOmdbMovieDetails} from "../../../../utils/UrlUtils";
import {fullTitle, joinNames} from "../../../../utils/Utils";
import BackdropImage from "./components/BackdropImage";
import Info from "./components/Info";
import MyLoader from "../../../../UI/Spinners/MyLoader";

import {makeStyles} from "@material-ui/core/styles";
import * as actions from "../../../../store/actions";

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
    const {root} = useStyles();

    const {tmdbApi, omdbApi} = useSelector(state => state.api);
    const selectedMovieDetails = useSelector(state => state.selectedMovieDetails);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

    const [movieDetails, setMovieDetails] = useState();
    const [omdbMovieDetails, setOmdbMovieDetails] = useState();
    const [cast, setCast] = useState();
    const [title, setTitle] = useState();
    const [genres, setGenres] = useState('');
    const [backdrops, setBackdrops] = useState([]);
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);
    const [isLoadingCast, setIsLoadingCast] = useState(true);

    const handleBack = () => {
        props.history.goBack();
    };

    const handleDeleteMovie = (id) => {
        console.log(getDeleteUrl(id));
        axios.delete(getDeleteUrl(id))
            .then(response => {
                onSetSnackbar({open: true, message: `Movie '${title}' is deleted`, type: 'success'});
                handleBack();
            })
            .catch(error => {
                console.log(error);
                onSetSnackbar({open: true, message: `Failed to deleted movie with id '${id}'`, type: 'error'});
                handleBack();
            });
    };

    useEffect(() => {
        setIsLoadingMovies(true);
        axios.get(getMovieDetailsUrl(movieId, tmdbApi))
            .then(response => {
                const {data} = response;
                const {imdb_id, genres, images, original_title} = data;
                const {backdrops} = images;

                setTitle(original_title);
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
        setIsLoadingCast(true);
        axios.get(getMovieCreditsUrl(movieId, tmdbApi))
            .then(response => {
                const {data} = response;
                const {cast} = data;
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
        const {movieToDetailsComponent: {id}} = selectedMovieDetails;
        details = (
            <div className={root}>
                <BackdropImage backdrops={backdrops}
                               alt={`${fullTitle(title, releaseDate)}`}
                               id={id}
                               onClose={handleBack}
                               onDelete={handleDeleteMovie}
                />
                <Info tmdbDetails={movieDetails}
                      omdbDetails={omdbMovieDetails}
                      fileDetails={selectedMovieDetails.movieToInfoComponent}
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