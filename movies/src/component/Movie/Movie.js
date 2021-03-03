import React from 'react';
import "./Movie.css";

// https://api.themoviedb.org/3/configuration?api_key=
// "poster_sizes": [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original"
// ]

const movie = props => {
    return (
        <div className="Movie">
            <img src={"http://image.tmdb.org/t/p/original" + props.posterPath}
                 onClick={() => props.clicked(props)}
                 alt={`${props.title} ${props.releaseDate}`}
            />
        </div>
    );
}

export default movie;