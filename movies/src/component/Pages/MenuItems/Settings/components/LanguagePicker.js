import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

import {language} from "../../../../../store/localStorage/actions";
import MyFormLabel from "../../../../../UI/MyFormLabel";
import {Language} from "../../../../../utils/Constants";

import {Button, ButtonGroup, Card, CardContent} from "@material-ui/core";


const languagePicker = () => {
    const [lang, setLang] = useState(language.get() || 'en');
    const {t, i18n} = useTranslation('common');

    const getVariant = (lng) => lang === lng ? 'contained' : '';

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

    return (
        <Card variant="elevation">
            <CardContent>
                <MyFormLabel text={t('text.chooseLanguage')}/>
                <ButtonGroup variant="text" color="primary">
                    <Button onClick={handleSetEnglish} variant={getVariant(Language.english)}>EN</Button>
                    <Button onClick={handleSetRussian} variant={getVariant(Language.russian)}>RU</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    );
};

export default languagePicker;