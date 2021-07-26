import React from 'react';
import {useTranslation} from "react-i18next";

import Fact from "../../../../../../../../UI/Fact";
import {joinNames} from "../../../../../../../../utils/Utils";

import {Typography} from "@material-ui/core";

const movieFacts = (props) => {
    const {
        details: {
            Director,
            Awards,
            Released,
            DVD,
            Title,
            budget,
            revenue,
            production_companies,
            production_countries,
            original_language
        },
    } = props;
    const {t} = useTranslation('common');

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
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
            <Fact header={t('text.released')}
                  text={Released}/>
            <Fact header="DVD: "
                  text={DVD}/>
            <Fact header={t('text.productionCompanies')}
                  text={joinNames(production_companies)}/>
            <Fact header={t('text.productionCountries')}
                  text={joinNames(production_countries)}/>
            <Fact header={t('text.originalLanguage')}
                  text={original_language}/>
        </Typography>
    );
};

export default movieFacts;