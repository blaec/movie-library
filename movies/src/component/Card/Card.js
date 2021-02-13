import React from 'react';
import "./Card.css";

const card = props => {
    return (
        <div className="Card">
            <img src={"http://image.tmdb.org/t/p/original" + props.posterPath}
                 loading="lazy"
                 alt="Italian Trulli"/>
        </div>
    );
};

export default card;