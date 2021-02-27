import React, {useEffect, useState} from 'react';
import './Details.css';
import {CircularProgress, Divider, Typography} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import axios from "../../axios-movies";
import {playTime, year} from '../../utils/Utils';
import Carousel from "react-material-ui-carousel";

const details = (props) => {
    const [movieData, setMovieData] = useState();
    const [genres, setGenres] = useState('');
    const [backdrops, setBackdrops] = useState([]);

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
        details = (
            <React.Fragment>
                <div className="ImageBackdrop">
                    <ArrowBackIcon onClick={props.closed}
                                   className="ImageBack"/>
                    <DeleteTwoToneIcon onClick={() => props.delete(props.id)}
                                   className="Delete"/>
                    <Carousel timeout={300}
                              animation="fade"
                              navButtonsAlwaysInvisible>
                        {backdrops.map( (backdrop, i) =>
                            <img key={i}
                                 height={window.innerWidth / backdrop.aspect_ratio}
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
        </div>
    );
};

export default details;