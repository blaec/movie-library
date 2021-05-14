import React from 'react';

import {FormControlLabel, makeStyles, Radio, RadioGroup} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3)
    },
}));

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
        key: "videos",
        label: "C | Videos",
    },
];

const fileRadios = (props) => {
    const {fileLocation, onChooseLocation} = props;
    const {root} = useStyles();

    const radios = movieLocations.map(location => {
            const {key, label} = location;
            return (
                <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio color="primary"/>}
                    label={label}
                />
            );
        }
    );

    return (
        <RadioGroup
            className={root}
            name="location"
            value={fileLocation}
            onChange={onChooseLocation}
        >
            {radios}
        </RadioGroup>
    );
};

export default fileRadios;