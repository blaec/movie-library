import React, {useEffect, useState} from 'react';

import {FormControl, makeStyles, MenuItem, Select} from "@material-ui/core";
import {language} from "../../../store/localStorage/actions";
import {Language} from "../../../utils/Constants";
import {useTranslation} from "react-i18next";

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
    const [age, setAge] = React.useState(10);
    const {t, i18n} = useTranslation('common');

    const handleChange = (event) => {
        if (event.target.value === 10) {
            handleSetEnglish();
        } else if (event.target.value === 20) {
            handleSetRussian();
        }
        setAge(event.target.value);
    };
    const handleSetEnglish = () => {
        setNewLanguage(Language.english);
    };

    const handleSetRussian = () => {
        setNewLanguage(Language.russian);
    };

    const setNewLanguage = (lang) => {
        setLang(lang);
        language.set(lang);
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        if (lang === Language.english) {
            setAge(10);
        } else if (lang === Language.russian) {
            setAge(20);
        }
    }, [lang]);


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
                value={age}
                onChange={handleChange}
            >
                <MenuItem value={10}>EN</MenuItem>
                <MenuItem value={20}>RU</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguagePicker;