import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

import {Button} from "@material-ui/core";
import {language} from "../../../store/localStorage/actions";

const languagePicker = () => {
    const [lang, setLang] = useState(language.get() || 'en');
    const {i18n} = useTranslation('common');

    useEffect(() => {
        if (language.get() === null) {
            language.set('en');
        }
        i18n.changeLanguage(language.get());
    }, [])

    const handleChangeLanguage = () => {
        let lang;
        switch (language.get()) {
            case 'en':  lang = 'ru';    break;
            default:    lang = 'en';
        }
        setLang(lang);
        language.set(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <Button
            variant='contained'
            color='secondary'
            onClick={handleChangeLanguage}
        >
            {lang}
        </Button>
    );
};

export default languagePicker;