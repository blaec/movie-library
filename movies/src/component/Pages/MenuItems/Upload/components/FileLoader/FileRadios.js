import React from 'react';

import {FormControlLabel, Radio} from "@material-ui/core";

const fileRadios = () => {
    const movieLocations = [
        {
            key: "cartoons",
            label: "K | Cartoons",
        },
        {
            key: "movies",
            label: "L | Movies",
        },
        {
            key: "serialMovies",
            label: "M | Serial Movies",
        },
        {
            key: "music",
            label: "D | New Movies",
        },
        {
            videos: "cartoons",
            label: "C | Videos",
        },
    ];

    const radios = movieLocations.map(location => {
            const {key, label} = location;
            return <FormControlLabel
                       key={key}
                       value={key}
                       control={<Radio color="primary"/>}
                       label={label}
                   />
        }
    );

    return <React.Fragment>
               {radios}
           </React.Fragment>;
};

export default fileRadios;