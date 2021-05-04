import React from 'react';

const actorMovies = (props) => {
    const {match : {params : {actorId}}} = props;

    return (
        <div>
            Actor movies: {actorId}
        </div>
    );
};

export default actorMovies;