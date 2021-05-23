import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MyLoader from "../../../../UI/Spinners/MyLoader";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../UI/MyFormLabel";
import {reactLinks} from "../../../../utils/UrlUtils";
import MyGrid from "../../../../UI/Buttons/MyGrid";
import {filterActions} from "../../../../store/filter-slice";
import {fetchGenres} from "../../../../store/filter-actions";

import {Card, CardActions, CardContent, FormControl, Select, useTheme} from "@material-ui/core";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import {isArrayEmpty, isStringEmpty} from "../../../../utils/Utils";

const filter = (props) => {
    console.log("filter");
    const theme = useTheme();
    const tmdbApi = useSelector(state => state.api.tmdb);
    const genres = useSelector(state => state.filter.genres);
    const dispatch = useDispatch();
    const onGenreIdsChange = (ids) => dispatch(filterActions.setGenreIds(ids));

    const [genreSelection, setGenreSelection] = useState([]);
    const isLoading = isStringEmpty(tmdbApi);

    useEffect(() => {
        if (!isLoading) {
            dispatch(fetchGenres(tmdbApi));
        }
    }, [tmdbApi]);

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
        props.history.push(reactLinks.filtered);
    };

    let genreFilter = <MyLoader/>;
    if (!isLoading) {
        const genreNames = genres.flatMap(genre => genre.name);
        genreFilter =
            <Card variant="elevation">
                <CardContent>
                    <FormControl
                        fullWidth
                        variant='outlined'
                    >
                        <MyFormLabel
                            text="Genres"
                            customStyle={{paddingBottom: theme.spacing(2)}}
                        />
                        <Select
                            multiple
                            native
                            value={genreSelection}
                            onChange={handleChangeMultiple}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {genreNames.map((name) => (
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
                            disabled={isArrayEmpty(genres)}
                            onSubmit={handleGetMovies}
                        />
                    </MyButtonGrid>
                </CardActions>
            </Card>;
    }

    return (
        <MyGrid>
            {[
                <React.Fragment key={1}>
                    {genreFilter}
                </React.Fragment>
            ]}
        </MyGrid>
    );
};

export default filter;