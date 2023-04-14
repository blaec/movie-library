import React from 'react';
import {useSelector} from "react-redux";
import RadioLabel from "./RadioLabel";

import {makeStyles} from "@mui/styles";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

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
    return { key, label, count, size, loc };
}

const fileRadios = (props) => {
    const {fileLocation, onChooseLocation} = props;
    const {root} = useStyles();

    const {
        collectionItems: movies,
        isCollectionItemsLoaded: isMoviesLoaded
    } = useSelector(state => state.collection.movies);

    let movieLocations = [
        createData('cartoons', 'L | Cartoons', [], '\\l_cartoons'),
        createData('movies', 'N | Movies', [], '\\n_movies'),
        createData('serialMovies', 'M | Serial Movies', [], '\\m_serial_movies'),
        createData('music', 'D | New Movies', [], '\\d_music'),
        createData('videos', 'C | Videos', [], '\\c_videos'),
    ];
    if (isMoviesLoaded) {
        movieLocations = movieLocations.map(m => createData(m.key, m.label, movies, m.loc));
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