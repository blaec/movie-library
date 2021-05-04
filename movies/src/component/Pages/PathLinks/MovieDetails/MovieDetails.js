import React from 'react';

const movieDetails = (props) => {
    const {match : {params : {movieId}}} = props;

    return (
        <div>
            Movie Details: {movieId}
        </div>
    );
};

export default movieDetails;