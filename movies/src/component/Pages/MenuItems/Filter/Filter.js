import React, {useEffect, useState} from 'react';
import axios from "../../../../axios-movies";
import {useDispatch, useSelector} from "react-redux";

import MyLoader from "../../../../UI/Spinners/MyLoader";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../UI/MyFormLabel";
import {getAllGenresUrl, reactLinks} from "../../../../utils/UrlUtils";
import * as actions from "../../../../store/actions";
import MyGrid from "../../../../UI/Buttons/MyGrid";

import {Card, CardActions, CardContent, FormControl, makeStyles, Select, useTheme} from "@material-ui/core";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
}));

const filter = (props) => {
    const {root} = useStyles();
    const theme = useTheme();
    const {tmdbApi} = useSelector(state => state.api);
    const dispatch = useDispatch();
    const onGenreIdsChange = (ids) => dispatch(actions.setGenreIds(ids));

    const [genreSelection, setGenreSelection] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // console.log("get data: " + (new Date()).getTime());
        setIsLoading(true);
        axios.get(getAllGenresUrl(tmdbApi))
            .then(response => {
                const {data} = response;
                const {genres} = data;
                setGenres(genres);
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
            <Card variant="elevation">
                <CardContent>
                    <FormControl
                        fullWidth
                        variant='outlined'
                    >
                        <MyFormLabel
                            text="Genres"
                            customStyle={{paddingBottom: theme.spacing(2)}}/>
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
                    <MyButtonGrid>
                        <MySubmitButton
                            icon={<HighlightOffTwoToneIcon/>}
                            buttonStyles={{marginRight: 1}}
                            caption="Clear"
                            type="danger"
                            onSubmit={handleClear}
                        />
                        <MySubmitButton
                            icon={<SearchTwoToneIcon/>}
                            caption="Filter"
                            type="success"
                            fill="filled"
                            onSubmit={handleGetMovies}
                        />
                    </MyButtonGrid>
                </CardActions>
            </Card>;
    }

    return (
        <MyGrid>
            {[genreFilter]}
        </MyGrid>
    );
};

export default filter;