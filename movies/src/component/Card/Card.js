import React from 'react';
import "./Card.css";

const card = props => {
    return (
        <div className="Card">
            <img src={"http://image.tmdb.org/t/p/original" + props.posterPath}
                 loading="lazy"
                 onClick={() => props.clicked(props)}
                 alt={`${props.title} ${props.releaseDate}`}
            />
        </div>
    );
}

export default card;