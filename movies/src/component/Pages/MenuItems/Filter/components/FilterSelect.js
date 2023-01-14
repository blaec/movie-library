import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import MyFormLabel from "../../../../../UI/MyFormLabel";
import MyButtonGrid from "../../../../../UI/Buttons/MyButtonGrid";
import MySubmitButton from "../../../../../UI/Buttons/MySubmitButton";
import {isArrayExist} from "../../../../../utils/Utils";

import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import {Card, CardActions, CardContent, FormControl, Select, useTheme} from "@material-ui/core";


const FilterSelect = (props) => {
    const {genres, url, caption} = props;
    const theme = useTheme();
    const {t} = useTranslation('common');

    const [genreSelection, setGenreSelection] = useState([]);
    const [genreIds, setGenreIds] = useState([]);

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
    const genreNames = genres.flatMap(genre => genre.name);


    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl
                    fullWidth
                    variant='outlined'
                >
                    <MyFormLabel
                        text={caption}
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
                        caption={t('button.clear')}
                        type="danger"
                        onSubmit={handleClear}
                    />
                    <MySubmitButton
                        disabled={!isArrayExist(genreSelection)}
                        icon={<SearchTwoToneIcon/>}
                        caption={t('button.filter')}
                        type="success"
                        fill="filled"
                        component={NavLink}
                        path={`${url}${genreIds}`}
                    />
                </MyButtonGrid>
            </CardActions>
        </Card>
    );
};

export default FilterSelect;