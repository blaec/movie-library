import React, {useEffect, useState} from 'react';
import './Details.css';
import {CircularProgress, Divider, Typography} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import axios from "../../axios-movies";
import {playTime, year} from '../../utils/Utils';
import Carousel from "react-material-ui-carousel";
import DeleteDialog from "./DeleteDialog";

const details = (props) => {
    const [movieData, setMovieData] = useState();
    const [genres, setGenres] = useState('');
    const [backdrops, setBackdrops] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeletedMovie = (id) => {
        setIsDeleting(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleting(false);
    };

    useEffect(() => {
        // credits
        // https://api.themoviedb.org/3/movie/9487/credits?api_key=d6c79c6e7c9d5f56185d9318481769bc&language=en-US
        axios.get('https://api.themoviedb.org/3/movie/' + props.tmdbId + '?api_key=d6c79c6e7c9d5f56185d9318481769bc&language=ru&append_to_response=images&include_image_language=ru,null')
            .then(response => {
                let movies = response.data;
                console.log(movies);
                console.log(props);
                setMovieData(movies);
                setGenres(movies.genres.map(g => g.name).join(', '));
                setBackdrops(movies.images.backdrops);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    let details = <CircularProgress/>
    if (movieData) {
        console.log(window.innerWidth);
        details = (
            <React.Fragment>
                <div className="ImageBackdrop">
                    <ArrowBackIcon onClick={props.closed}
                                   className="ImageBack"
                                   fontSize="large"/>
                    <DeleteTwoToneIcon onClick={handleDeletedMovie}
                                       className="Delete"
                                       fontSize="large"/>
                    <Carousel timeout={300}
                              animation="fade"
                              navButtonsAlwaysInvisible>
                        {backdrops.map( (backdrop, i) =>
                            <img key={i}
                                 height={(window.innerWidth - (window.innerWidth > 600 ? 150 : 0)) / backdrop.aspect_ratio}
                                 src={"http://image.tmdb.org/t/p/original" + backdrop.file_path}
                                 alt={`${movieData.title} ${movieData.releaseDate}`}
                            />
                        )}
                    </Carousel>
                </div>
                <div className="Info">
                    <Typography variant="caption" display="block" gutterBottom color="textSecondary">
                        {props.location}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {year(movieData.release_date)} {'\u2B24'} {playTime(movieData.runtime)} {'\u2B24'} {props.resolution} {'\u2B24'} {props.size}Gb
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        <strong>{movieData.title}</strong>
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {genres}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1" gutterBottom>
                        <strong>{movieData.tagline}</strong>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {movieData.overview}
                    </Typography>
                </div>
            </React.Fragment>
        );
    }

    return (
        <div className="Details">
            {details}
            <DeleteDialog open={isDeleting}
                          exit={handleCloseDeleteDialog}
                          delete={() => props.delete(props.id)}
            />
        </div>
    );
};

export default details;