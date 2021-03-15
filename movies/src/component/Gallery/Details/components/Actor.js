import React from 'react';

const actor = (props) => {
    return (
        <div>
            <p>{props.name}</p>
            <p>as {props.character}</p>
            <p>img {props.profile_path}</p>
        </div>
    );
};

export default actor;