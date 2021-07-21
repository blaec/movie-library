import React from 'react';

import Fact from "../../MovieDetails/components/InfoComponents/Tabs/Facts/Fact";
import {fullYear, isStringExist} from "../../../../../utils/Utils";

import {Typography} from "@material-ui/core";

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