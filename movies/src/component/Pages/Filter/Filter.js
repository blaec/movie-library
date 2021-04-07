import React, {useEffect, useState} from 'react';
import {Card, CardActions, CardContent, FormControl, InputLabel, makeStyles, Select} from "@material-ui/core";
import axios from "../../../axios-movies";
import {getAllGenresUrl} from "../../../utils/UrlUtils";
import MyLoader from "../../../UI/Spinners/MyLoader";
import MySubmitButton from "../../../UI/Buttons/MySubmitButton";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import './Filter.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    }
}));

const filter = (props) => {
    const classes = useStyles();
    const [genreSelection, setGenreSelection] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genreIds, setGenreIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredMovies, setFilteredMovies] = useState();

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
        const ids = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
                ids.push(genres.filter(g => g.name === options[i].value)[0].id);
            }
        }
        setGenreSelection(value);
        setGenreIds(ids);
    };

    const handleGetMovies = () => {
        console.log(genreIds);
        axios.post("/movies/filter", genreIds)
            .then(response => {
                setFilteredMovies(response.data);
                setIsLoading(false);
                console.log(response.data);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            });
    };

    let genreFilter = <MyLoader/>;
    if (!isLoading) {
        const names = genres.flatMap(g => g.name);
        genreFilter =
            <Card variant="elevation">
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="select-multiple-native">
                            Genres
                        </InputLabel>
                        <Select
                            multiple
                            native
                            value={genreSelection}
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
                </CardContent>
                <CardActions>
                    <MySubmitButton icon={<SearchTwoToneIcon/>}
                                    submit={handleGetMovies}
                                    caption="Filter"
                    />
                </CardActions>
            </Card>
    }

    return (
        <div className='Filter'>
            {genreFilter}
        </div>
    );
};

export default filter;