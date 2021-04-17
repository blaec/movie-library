import React from 'react';

import {getImageUrl} from "../../../../../utils/UrlUtils";
import "./Movie.css";

const movie = props => {
    const {poster, alt, onClick} = props;

    return (
        <div className="Movie">
            <img src={getImageUrl(poster)}
                 onClick={() => onClick(props)}
                 alt={alt}
            />
        </div>
    );
}

export default movie;