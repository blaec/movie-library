import React from 'react';

import Fact from "../../MovieDetails/components/InfoComponents/Tabs/Facts/Fact";

import {Typography} from "@material-ui/core";
import {joinNames, fullYear, isStringExist} from "../../../../../utils/Utils";

const facts = (props) => {
    const {
        details: {
            birthday,
            deathday,
            place_of_birth,
            homepage,
            also_known_as,
        },
    } = props;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const birthYear = fullYear(birthday);
    const age = isStringExist(birthYear)
        ? new Date().getFullYear() - birthYear
        : null;
    return (
        <Typography component="div">
            <Fact header="Born: "
                  text={birthday}/>
            <Fact header="Died: "
                  text={deathday}/>
            <Fact header="Age: "
                  text={age}/>
            <Fact header="Birthplace: "
                  text={place_of_birth}/>
            <Fact header="Homepage: "
                  homepage={homepage}/>
            <Fact header="Also Known As: "
                  text={also_known_as.join(', ')}/>
        </Typography>
    );
};

export default facts;