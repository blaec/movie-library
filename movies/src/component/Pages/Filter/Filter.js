import React, {useEffect, useState} from 'react';
import {Card, CardActions, CardContent, FormControl, InputLabel, makeStyles, Select} from "@material-ui/core";
import axios from "../../../axios-movies";
import {getAllGenresUrl, reactLinks} from "../../../utils/UrlUtils";
import MyLoader from "../../../UI/Spinners/MyLoader";
import MySubmitButton from "../../../UI/Buttons/MySubmitButton";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import './Filter.css';
import * as actions from "../../../store/actions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(9)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
        paddingTop: theme.spacing(1)
    },
    label: {
        fontWeight: 1000,
        fontSize: 20
    }
}));

const filter = (props) => {
    const dispatch = useDispatch();

    const classes = useStyles();
    const [genreSelection, setGenreSelection] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onGenreIdsChange = (ids) => dispatch(actions.setGenreIds(ids));

    useEffect(() => {
        // console.log("get data: " + (new Date()).getTime());
        setIsLoading(true);
        axios.get(getAllGenresUrl())
            .then(response => {
                setGenres(response.data.genres);
                // console.log(genres);
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
        onGenreIdsChange(ids);
    };

    const handleClear = () => {
        setGenreSelection([]);
        onGenreIdsChange([]);
    }

    const handleGetMovies = () => {
        setIsLoading(true);
        props.history.push(reactLinks.filtered);
    };

    let genreFilter = <MyLoader/>;
    if (!isLoading) {
        const names = genres.flatMap(g => g.name);
        genreFilter =
            <Card variant="elevation" className={classes.card}>
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.label} shrink htmlFor="select-multiple-native">
                            GENRES
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
                    <MySubmitButton icon={<HighlightOffTwoToneIcon/>}
                                    submit={handleClear}
                                    caption="Clear"
                    />
                </CardActions>
            </Card>;
    }

    return (
        <div className='Filter'>
            {genreFilter}
        </div>
    );
};

export default filter;