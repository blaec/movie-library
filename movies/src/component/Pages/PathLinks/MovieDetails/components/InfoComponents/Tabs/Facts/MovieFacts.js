import React from 'react';
import {useTranslation} from "react-i18next";

import Release from "./Release";
import Fact from "../../../../../../../../UI/Fact";
import {isArrayExist, joinNames} from "../../../../../../../../utils/Utils";

import {makeStyles, Paper, Typography} from "@material-ui/core";
import {ReleaseType} from "../../../../../../../../utils/Constants";

const useStyles = makeStyles((theme) => ({
    images: {
        display: 'flex',
        overflow: 'auto',
    },
}));


const movieFacts = (props) => {
    const {images} = useStyles();
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
        usReleases = usReleaseDates[0].map((rd, index) => {
            // const {type, release_date} = rd;
            // const options = { year: 'numeric', month: 'short', day: '2-digit' };
            return (
                <Release key={index} data={rd}/>
                // <Fact key={index}
                //       header={`${t('text.released')} ${ReleaseType[type]}: `}
                //       text={`${new Date(release_date).toLocaleDateString("en-GB", options)}`}/>
            )
        });
    }

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
            <Fact header={t('text.originalTitle')}
                  text={original_title}/>
            <Fact header={t('text.released')}
                  text=" "/>
            <div className={images}>
                {usReleases}
            </div>
        </Typography>
    );
};

export default movieFacts;