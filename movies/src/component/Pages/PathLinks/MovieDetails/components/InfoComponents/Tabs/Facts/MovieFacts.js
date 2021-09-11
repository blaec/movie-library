import React from 'react';
import {useTranslation} from "react-i18next";

import Release from "./Release";
import Fact from "../../../../../../../../UI/Fact";
import {isArrayExist, joinNames} from "../../../../../../../../utils/Utils";

import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    releases: {
        display: 'flex',
        overflow: 'auto',
    },
}));


const movieFacts = (props) => {
    const {releases} = useStyles();
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

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const usReleaseDates = release_dates.results
        .filter(result => result.iso_3166_1 === 'US')
        .map(rd => rd.release_dates);
    let usReleases = null;
    if (isArrayExist(usReleaseDates)) {
        usReleases = usReleaseDates[0].map((rd, index) => (
            <Release
                key={index}
                data={rd}
            />
        ));
    }
    const showReleases = usReleases === null ? '' : ' ';

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
            <Fact header={t('text.releases')}
                  text={showReleases}/>
            <div className={releases}>
                {usReleases}
            </div>
        </Typography>
    );
};

export default movieFacts;