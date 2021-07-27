import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

import {language} from "../../../../../store/localStorage/actions";
import MyFormLabel from "../../../../../UI/MyFormLabel";

import {Button, ButtonGroup, Card, CardContent} from "@material-ui/core";


const languagePicker = () => {
    const [lang, setLang] = useState(language.get() || 'en');
    const {t, i18n} = useTranslation('common');

    const getVariant = (lng) => lang === lng ? 'contained' : '';

    const handleSetEnglish = () => {
        setNewLanguage('en');
    };

    const handleSetRussian = () => {
        setNewLanguage('ru');
    };

    const setNewLanguage = (lang) => {
        setLang(lang);
        language.set(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <Card variant="elevation">
            <CardContent>
                <MyFormLabel text={t('text.chooseLanguage')}/>
                <ButtonGroup variant="text" color="primary">
                    <Button onClick={handleSetEnglish} variant={getVariant('en')}>EN</Button>
                    <Button onClick={handleSetRussian} variant={getVariant('ru')}>RU</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    );
};

export default languagePicker;