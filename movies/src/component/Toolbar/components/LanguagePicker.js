import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

import {Button} from "@material-ui/core";

const languagePicker = () => {
    const [lang, setLang] = useState('EN');
    const {i18n} = useTranslation('common');

    const handleChangeLanguage = () => {
        switch (i18n.language) {
            case 'ru':
                setLang('EN');
                i18n.changeLanguage('en');
                break;
            case 'en':
                setLang('RU');
                i18n.changeLanguage('ru');
                break;
            default:
                console.log("error");
        }
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