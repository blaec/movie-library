import React from 'react';
import "./Movie.css";
import {url_endpoints} from "../../utils/constants";

const movie = props => {
    return (
        <div className="Movie">
            <img src={url_endpoints.image + props.posterPath}
                 onClick={() => props.clicked(props)}
                 alt={`${props.title} ${props.releaseDate}`}
            />
        </div>
    );
}

export default movie;