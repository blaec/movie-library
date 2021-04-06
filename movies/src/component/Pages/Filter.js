import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, makeStyles, Select} from "@material-ui/core";
import axios from "../../axios-movies";
import {getAllGenresUrl, getMovieDetailsUrl, getOmdbMovieDetails} from "../../utils/UrlUtils";
import {joinNames} from "../../utils/Utils";
import MyLoader from "../../UI/Spinners/MyLoader";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const filter = () => {
    const classes = useStyles();
    const [personName, setPersonName] = React.useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // console.log("get data: " + (new Date()).getTime());
        setIsLoading(true);
        axios.get(getAllGenresUrl())
            .then(response => {
                setGenres(response.data.genres);
                console.log(genres);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);


    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
    };

    let genreFilter = <MyLoader/>;
    if (!isLoading) {
        const names = genres.flatMap(g => g.name);
        genreFilter =
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="select-multiple-native">
                    Native
                </InputLabel>
                <Select
                    multiple
                    native
                    value={personName}
                    onChange={handleChangeMultiple}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                >
                    {names.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </Select>
            </FormControl>
    }

    return (
        <div>
            {genreFilter}
        </div>
    );
};

export default filter;