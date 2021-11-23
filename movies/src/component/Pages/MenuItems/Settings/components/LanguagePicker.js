import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

import {language} from "../../../../../store/localStorage/actions";
import MyFormLabel from "../../../../../UI/MyFormLabel";
import {Language} from "../../../../../utils/Constants";

import {Button, ButtonGroup, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


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


    const warning = language.get() === Language.english
        ? null
        : (
            <CardActions>
                <ErrorOutlineIcon color='error'/>
                <Typography
                    display='inline'
                    variant='caption'
                    color='textSecondary'
                >
                    Если перевод отсутствует - данные элементы могут отсутствовать (описание, биография, трейлер...) или
                    будут заменены на английский вариант (имена актеров, постер...)
                </Typography>
            </CardActions>
        );

    return (
        <Card variant="elevation">
            <CardContent>
                <MyFormLabel text={t('text.chooseLanguage')}/>
                <ButtonGroup variant="text" color="primary">
                    <Button onClick={handleSetEnglish} variant={getVariant(Language.english)}>English</Button>
                    <Button onClick={handleSetRussian} variant={getVariant(Language.russian)}>Русский</Button>
                </ButtonGroup>
            </CardContent>
            {warning}
        </Card>
    );
};

export default languagePicker;