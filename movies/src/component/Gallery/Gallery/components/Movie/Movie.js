import React from 'react';

import {getImageUrl} from "../../../../../utils/UrlUtils";
import "./Movie.css";

const movie = props => {
    const {poster, alt, onClick, movieDetailsComponent, movieInfoComponent} = props;

    return (
        <div className="Movie">
            <img src={getImageUrl(poster)}
                 onClick={() => onClick({movieDetailsComponent: movieDetailsComponent, movieInfoComponent: movieInfoComponent})}
                 alt={alt}
            />
        </div>
    );
}

export default movie;