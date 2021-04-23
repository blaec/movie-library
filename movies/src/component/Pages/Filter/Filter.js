import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {useDispatch, useSelector} from "react-redux";

import MyLoader from "../../../UI/Spinners/MyLoader";
import MySubmitButton from "../../../UI/Buttons/MySubmitButton";
import ButtonGrid from "../../../UI/Buttons/ButtonGrid";
import {getAllGenresUrl, reactLinks} from "../../../utils/UrlUtils";
import * as actions from "../../../store/actions";
import './Filter.css';

import {Card, CardActions, CardContent, FormControl, InputLabel, makeStyles, Select} from "@material-ui/core";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

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
    const {card, formControl, label} = useStyles();
    const configs = useSelector(state => state.api);
    const dispatch = useDispatch();
    const onGenreIdsChange = (ids) => dispatch(actions.setGenreIds(ids));

    const [genreSelection, setGenreSelection] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // console.log("get data: " + (new Date()).getTime());
        setIsLoading(true);
        axios.get(getAllGenresUrl(configs.tmdbApi))
            .then(response => {
                setGenres(response.data.genres);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    const handleChangeMultiple = (event) => {
        const {options} = event.target;
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
    };

    const handleGetMovies = () => {
        setIsLoading(true);
        props.history.push(reactLinks.filtered);
    };

    let genreFilter = <MyLoader/>;
    if (!isLoading) {
        const names = genres.flatMap(g => g.name);
        genreFilter =
            <Card variant="elevation" className={card}>
                <CardContent>
                    <FormControl className={formControl}>
                        <InputLabel className={label} shrink htmlFor="select-multiple-native">
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
                    <ButtonGrid>
                        <MySubmitButton icon={<SearchTwoToneIcon/>}
                                        buttonStyles={{marginRight: 1}}
                                        caption="Filter"
                                        type="success"
                                        fill="filled"
                                        onSubmit={handleGetMovies}
                        />
                        <MySubmitButton icon={<HighlightOffTwoToneIcon/>}
                                        caption="Clear"
                                        type="danger"
                                        onSubmit={handleClear}
                        />
                    </ButtonGrid>
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