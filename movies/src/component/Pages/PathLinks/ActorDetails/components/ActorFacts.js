import React from 'react';
import {useTranslation} from "react-i18next";

import Fact from "../../../../../utils/Fact";
import {fullYear, isStringExist} from "../../../../../utils/Utils";

import {Typography} from "@material-ui/core";

const actorFacts = (props) => {
    const {
        details: {
            birthday,
            deathday,
            place_of_birth,
            homepage,
            also_known_as,
        },
    } = props;
    const {t} = useTranslation('common');

    const age = isStringExist(birthday)
        ? new Date().getFullYear() - fullYear(birthday)
        : null;
    return (
        <Typography component="div">
            <Fact header={t('text.born')}
                  text={birthday}/>
            <Fact header={t('text.died')}
                  text={deathday}/>
            <Fact header={t('text.age')}
                  text={age}/>
            <Fact header={t('text.birthplace')}
                  text={place_of_birth}/>
            <Fact header={t('text.homepage')}
                  homepage={homepage}/>
            <Fact header={t('text.knownAs')}
                  text={also_known_as.join(', ')}/>
        </Typography>
    );
};

export default actorFacts;