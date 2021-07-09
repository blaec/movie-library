import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import MyLoader from "../../../../UI/Spinners/MyLoader";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../UI/MyFormLabel";
import {reactLinks} from "../../../../utils/UrlUtils";
import MyGrid from "../../../../UI/Buttons/MyGrid";
import {fetchGenres} from "../../../../store/state/filter/filter-actions";
import {isArrayExist, isStringExist} from "../../../../utils/Utils";
import {collectionActions} from "../../../../store/state/collection/collection-slice";

import {Card, CardActions, CardContent, FormControl, Select, useTheme} from "@material-ui/core";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

const filter = () => {
    const theme = useTheme();
    const tmdbApi = useSelector(state => state.api.tmdb);
    const genres = useSelector(state => state.filter.genres);
    const dispatch = useDispatch();

    const [genreSelection, setGenreSelection] = useState([]);
    const [genreIds, setGenreIds] = useState([]);

    useEffect(() => {
        if (isStringExist(tmdbApi)) {
            dispatch(fetchGenres(tmdbApi));
            dispatch(collectionActions.resetFilteredMovies());
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
        setGenreIds(ids);
    };

    const handleClear = () => {
        setGenreSelection([]);
        setGenreIds([]);
    };

    let genreFilter = <MyLoader/>;
    if (isArrayExist(genres)) {
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
                            disabled={!isArrayExist(genreSelection)}
                            icon={<HighlightOffTwoToneIcon/>}
                            buttonStyles={{marginRight: 1}}
                            caption="Clear"
                            type="danger"
                            onSubmit={handleClear}
                        />
                        <MySubmitButton
                            disabled={!isArrayExist(genreSelection)}
                            icon={<SearchTwoToneIcon/>}
                            caption="Filter"
                            type="success"
                            fill="filled"
                            component={NavLink}
                            path={`${reactLinks.filterByGenreEndpoint}${genreIds}`}
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