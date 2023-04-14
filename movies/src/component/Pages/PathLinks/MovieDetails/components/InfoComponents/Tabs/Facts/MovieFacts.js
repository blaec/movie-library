import React from 'react';
import {useTranslation} from "react-i18next";

import Releases from "./releases/Releases";
import Fact from "../../../../../../../../UI/Fact";
import {joinNames} from "../../../../../../../../utils/Utils";

import {Typography} from "@mui/material";


const movieFacts = (props) => {
    const {
        details: {
            Director,
            Awards,
            Title,
            budget,
            revenue,
            production_companies,
            production_countries,
            original_language,
            original_title,
            release_dates
        },
    } = props;
    const {t} = useTranslation('common');

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    return (
        <Typography component="div">
            <Fact header={t('text.englishTitle')}
                  text={Title}/>
            <Fact header={t('text.directedBy')}
                  text={Director}/>
            <Fact header={t('text.budget')}
                  text={formatter.format(budget)}/>
            <Fact header={t('text.revenue')}
                  text={formatter.format(revenue)}/>
            <Fact header={t('text.awards')}
                  text={Awards}/>
            <Fact header={t('text.productionCompanies')}
                  text={joinNames(production_companies)}/>
            <Fact header={t('text.productionCountries')}
                  text={joinNames(production_countries)}/>
            <Fact header={t('text.originalLanguage')}
                  text={original_language}/>
            <Fact header={t('text.originalTitle')}
                  text={original_title}/>
            <Releases releaseDates={release_dates}/>
        </Typography>
    );
};

export default movieFacts;