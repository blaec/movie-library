import React from 'react';
import {useSelector} from "react-redux";

import {isArrayExist} from "../../../../../../utils/Utils";
import RadioLabel from "./RadioLabel";

import {FormControlLabel, makeStyles, Radio, RadioGroup} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3)
    },
}));

const nf = new Intl.NumberFormat();
const createData = (key, label, data, loc) => {
    let moviesByLocation = data.filter(movie => movie.location.includes(loc));
    let count = moviesByLocation.length;
    let sizeVal = moviesByLocation.reduce(((sum, movie) => sum + movie.size), 0);
    let size = nf.format(sizeVal.toFixed(0));
    return { key, label, count, size };
}

const fileRadios = (props) => {
    const {fileLocation, onChooseLocation} = props;
    const {root} = useStyles();

    const movies = useSelector(state => state.collection.movies);

    let movieLocations = [];
    if (isArrayExist(movies)) {
        movieLocations = [
            createData('cartoons', 'K | Cartoons', movies, '\\k_cartoons'),
            createData('movies', 'L | Movies', movies, '\\l_movies'),
            createData('serialMovies', 'M | Serial Movies', movies, '\\m_serial_movies'),
            createData('music', 'D | New Movies', movies, '\\d_music'),
            createData('videos', 'C | Videos', movies, '\\c_videos'),
        ];
    }

    const radios = movieLocations.map(location => {
            const {key} = location;
            return (
                <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio color="primary"/>}
                    label={<RadioLabel data={location}/>}
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