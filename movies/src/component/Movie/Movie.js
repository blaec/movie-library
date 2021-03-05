import React from 'react';
import "./Movie.css";
import {getImageUrl} from "../../utils/UrlUtils";

const movie = props => {
    return (
        <div className="Movie">
            <img src={getImageUrl(props.posterPath)}
                 onClick={() => props.clicked(props)}
                 alt={`${props.title} ${props.releaseDate}`}
            />
        </div>
    );
}

export default movie;