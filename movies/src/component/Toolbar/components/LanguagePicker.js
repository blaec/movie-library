import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

import {language} from "../../../store/localStorage/actions";
import {Language} from "../../../utils/Constants";

import {FormControl, makeStyles, MenuItem, Select} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        },
        '&:not(.Mui-disabled):hover::before': {
            borderColor: 'white',
        },
    },
    icon: {
        fill: 'white',
    },
    root: {
        color: 'white',
    },
}));

const LanguagePicker = () => {
    const classes = useStyles();
    const [lang, setLang] = useState(language.get() || 'en');
    const {i18n} = useTranslation('common');

    const handleChange = (event) => {
        setNewLanguage(event.target.value)
    };

    const setNewLanguage = (lang) => {
        setLang(lang);
        language.set(lang);
        i18n.changeLanguage(lang);
    };


    return (
        <FormControl className={classes.formControl}>
            <Select
                className={classes.select}
                inputProps={{
                    classes: {
                        icon: classes.icon,
                        root: classes.root,
                    },
                }}
                value={lang}
                onChange={handleChange}
            >
                <MenuItem value={Language.english}>EN</MenuItem>
                <MenuItem value={Language.russian}>RU</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguagePicker;